const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
require("dotenv").config();
const cors = require("cors");

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
}));
app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/index"));

// データベースに接続
try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("データベースに接続しました");
}
catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中・・・");
});
