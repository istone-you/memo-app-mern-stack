const router = require("express").Router();
const memoContoroller = require("../controllers/memo");
const tokenHandler = require("../handlers/token");

//メモの新規作成API
router.post("/", tokenHandler.verifyToken, memoContoroller.create);

//すべてのメモを取得するAPI
router.get("/", tokenHandler.verifyToken, memoContoroller.getAll);

//１つのメモを取得するAPI
router.get("/:memoId", tokenHandler.verifyToken, memoContoroller.getOne);

//メモの更新API
router.put("/:memoId", tokenHandler.verifyToken, memoContoroller.update);

module.exports = router;