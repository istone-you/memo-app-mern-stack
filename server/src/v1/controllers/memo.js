const Memo = require('../models/memo');

exports.create = async (req, res) => {
    try {
        const memoCount = await Memo.find().count();
        // メモの新規作成
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        return res.status(201).json(memo);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.getAll = async (req, res) => {
    try {
        const memos = await Memo.find({ user: req.user._id }).sort( "-position" );
        return res.status(200).json(memos);
    } catch (error) {
        return res.status(500).json(error);
    }
};