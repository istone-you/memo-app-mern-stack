const JWT = require("jsonwebtoken");
const User = require("../models/user");

//クライアントから送られてきたトークンを検証する
const tokenDecord = (req) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")[1];
        try {
            const decoded = JWT.verify(bearer, process.env.SECRET_KEY);
            return decoded;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}


// JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
    const decodedToken = tokenDecord(req);
    if (decodedToken) {
        // そのJWTトークンと一致するユーザーを探す
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ error: "権限がありません" });
        }
        req.user = user;
        next();
    } else {
        return res.status(401).json({ error: "権限がありません" });
    }
}