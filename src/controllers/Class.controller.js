const SchoolClass = require("../models/SchoolClass.schema");
//Keyword class is protective in JS so it's not a good thing to name our controllers and other thing class so we will be using SchoolClass

//Get SchoolClasses this can be either get by School class name or if no query parameter is appended then it will return all Classes
const getSchoolClasses = async (req, res) => {
    const resp = {
        status: false,
        data: {},
    };
    try {
        let className = req.query.className;
        if (className !== undefined) {
            let schoolClassObj = await SchoolClass.find({ name: className.trim() });
            if (schoolClassObj != null) {
                resp.status = true;
                resp.data = schoolClassObj;
                return res.status(200).send(resp);
            }
        } else {

            let schoolClasses = await SchoolClass.find({});
            if (schoolClasses.length > 0) {
                resp.status = true;
                resp.data = schoolClasses;
                return res.status(200).send(resp);
            }
        }
        return res.status(400).send(resp);
    } catch (e) {
        console.log(e);
        res.status(400).send(resp); return;
    }
}

//Create School Class with name, teacher, period, subject If name is already there then no new class document will be created.
const createSchoolClass = async (req, res) => {
    const resp = {
        status: false,
        data: {},
    };
    try {
        const { className, teacher, student, period } = req.body;

        let schoolClassObj = null;
        let isFound = await SchoolClass.findOne({ name: className })
        if (!isFound) {
            schoolClassObj = new SchoolClass({
                name: className, teachers: [teacher],
                students: [student], periods: [period]
            });
            await schoolClassObj.save();
        } else {
            schoolClassObj = await SchoolClass.findOneAndUpdate({ name: className }, {
                $push: {
                    teachers: [teacher],
                    students: [student], periods: [period]
                }
            }, { new: true })
        }
        if (schoolClassObj != null) {
            resp.status = true;
            resp.data = schoolClassObj;
            res.status(200).send(resp);
            return;
        }
        res.status(400).send(resp); return;
    } catch (e) {
        console.log(e);
        res.status(400).send(resp); return;
    }
}


//This method reset array length to zero
//Update the School Class document
const updateSchoolClass = async (req, res) => {
    const resp = {
        status: false,
        data: {},
    };
    try {
        const { className, newClassName, teacher, student, period } = req.body;
        let schoolClassObj = null;
        let isFound = await SchoolClass.findOne({ name: className })
        if (isFound) {
            schoolClassObj = await SchoolClass.findOneAndUpdate({ name: className }, {
                $set: {
                    name: newClassName,
                    teachers: [teacher],
                    students: [student], periods: [period]
                }
            }, { new: true })
            resp.status = true;
            resp.data = schoolClassObj;
            res.status(200).send(resp); return;
        }
        res.status(400).send(resp); return;
    } catch (e) {
        console.log(e);
        res.status(400).send(resp); return;
    }
}

//Delete the class by name
const deleteSchoolClass = async (req, res) => {
    const resp = {
        status: false,
        data: {},
    };
    try {
        let className = req.body.className;
        if (className !== undefined) {
            let schoolClassObj = await SchoolClass.deleteOne({ name: className.trim() });
            if (schoolClassObj != null) {
                resp.status = true;
                resp.data = schoolClassObj;
                return res.status(200).send(resp);
            }
        }
        res.status(400).send(resp); return;
    } catch (e) {
        console.log(e);
        res.status(400).send(resp); return;
    }
}
module.exports = { getSchoolClasses, createSchoolClass, updateSchoolClass, deleteSchoolClass };