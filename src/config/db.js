const mongoose = require('mongoose');

const mongoDbConnectionUrl = `${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
mongoose.connect(mongoDbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", () => {
    console.log(`MongoDB connection error on ${mongoDbConnectionUrl} Please make sure mongodb is running`);
});
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = db;