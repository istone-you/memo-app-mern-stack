const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const validationHandler = require("../handlers/validation");
const userContoroller = require("../controllers/user");
const tokenHandler = require("../handlers/token");

// ユーザー新規登録API
router.post(
    "/registar",
    body("username")
        .isLength({ min: 4 })
        .withMessage("ユーザー名は4文字以上である必要があります"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("確認用パスワードは8文字以上である必要があります"),
    body("username").custom((value) => {
        return User.findOne({ username: value }).then((user) => {
            if (user) {
                return Promise.reject("ユーザー名は既に存在しています");
            }
        });
    }),
    validationHandler.validate,
    userContoroller.register
);

// ログイン用API
router.post(
    "/login",
    body("username")
        .isLength({ min: 4 })
        .withMessage("ユーザー名は4文字以上である必要があります"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    validationHandler.validate,
    userContoroller.login
);

// JWT認証用API
router.post(
    "/verify-token",
    tokenHandler.verifyToken,
    (req, res) => {
        res.status(200).json({ user: req.user });
    }
);

module.exports = router;