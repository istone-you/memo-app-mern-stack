const router = require("express").Router();
const memoContoroller = require("../controllers/memo");
const tokenHandler = require("../handlers/token");

//メモの新規作成API
router.post("/", tokenHandler.verifyToken, memoContoroller.create);

//すべてのメモを取得するAPI
router.get("/", tokenHandler.verifyToken, memoContoroller.getAll);

//１つのメモを取得するAPI
router.get("/:memoId", tokenHandler.verifyToken, memoContoroller.getOne);

module.exports = router;