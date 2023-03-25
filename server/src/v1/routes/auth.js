const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const { validate } = require("../handlers/validation");
const { register } = require("../controllers/user");

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
    validate,
    register
);

// ログインAPI

module.exports = router;