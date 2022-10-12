const express = require('express');
const dotenv = require('dotenv').config();
process.env
//School Class Routes
const schoolClassRoutes = require('./routes/schoolClass.routes');
//DB Configuration
const db = require('./config/db');
const app = express();
app.use(express.json())
app.use(schoolClassRoutes);
db.on('connected', () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
});