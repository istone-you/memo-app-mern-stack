const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const User = require("../models/user");

// ユーザー新規登録
exports.register = async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;

    try {
        // パスワードのハッシュ化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        // ユーザーの新規作成
        const user = await User.create(req.body);
        // JWTトークンの生成
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });
        // レスポンス
        return res.status(200).json({ user, token });
    }
    catch (error) {
        // エラーのレスポンス
        return res.status(500).json(error);
    }
}

// ログイン
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        //ユーザーの検索
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "username",
                        msg: "ユーザーが見つかりません",
                    }
                ]
            });
        }

        //パスワードの照合
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

        if (decryptedPassword.toString(CryptoJS.enc.Utf8) !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "パスワードが違います",
                    }
                ]
            });
        }

        // JWTトークンの生成
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });

        // レスポンス
        return res.status(200).json({ user, token });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}