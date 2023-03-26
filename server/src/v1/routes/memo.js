const router = require("express").Router();
const memoContoroller = require("../controllers/memo");
const tokenHandler = require("../handlers/token");

//メモの新規作成API
router.post("/", tokenHandler.verifyToken, memoContoroller.create);

//メモの取得API
router.get("/", tokenHandler.verifyToken, memoContoroller.getAll);

module.exports = router;