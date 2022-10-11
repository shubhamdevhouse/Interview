const express = require("express");
const router = express.Router();
const classModel = require('../models/class.schema');
const ObjectId = require("mongoose").Schema.ObjectId;
router.get("/", async function (req, res) {
    const resp = {
        status: false,
        data: {},
    };
    if (req.query.name !== undefined) {
        let classObj = await classModel.find({ name: req.query.name.trim() });
        if (classObj != null) {
            resp.status = true;
            resp.data = classObj;
            return res.status(200).send(resp);

        }
    } else {

        let classes = await classModel.find({});
        if (classes.length > 0) {
            resp.status = true;
            resp.data = classes;
            return res.status(200).send(resp);

        }
    }
    return res.status(400).send(resp);
});
router.post("/", async function (req, res) {
    const resp = {
        status: false,
        data: {},
    };
    let className = req.body.name;
    let teacher = req.body.teacher;
    let student = req.body.student;
    let period = req.body.period;
    let classObj = null;
    let isFound = await classModel.findOne({ name: className })
    if (!isFound) {

        classObj = new classModel({
            name: className, teachers: [teacher],
            students: [student], periods: [period]
        });
        await classObj.save();

    } else {
        classObj = await classModel.findOneAndUpdate({ name: className }, {
            $push: {
                teachers: [teacher],
                students: [student], periods: [period]
            }
        }, { new: true })
    }
    if (classObj != null) {

        resp.status = true;
        resp.data = classObj;
        res.status(200).send(resp);
        return;
    }
    res.status(400).send(resp); return;
});

module.exports = router;