const { Router } = require("express");
const { getSchoolClasses, createSchoolClass, updateSchoolClass, deleteSchoolClass } = require('../controllers/Class.controller');
const router = Router();

router.get("/", getSchoolClasses);

router.post("/", createSchoolClass);

router.patch("/", updateSchoolClass);

router.delete("/", deleteSchoolClass);
module.exports = router;