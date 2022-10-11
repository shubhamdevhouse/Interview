const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const classRoute = require("./routes/class.route");
const mongoDB = "mongodb://127.0.0.1/school";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected successfully");
});
const app = express();
app.use(express.json())
app.use("/class", classRoute);
app.use(function (req, res, next) {
    req.db = db; //this db comes from app.js context where you define it
    next();
});
app.listen(8080, () => {
    console.log("Listening on port 8080");
})