const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ObjectId = mongoose.ObjectId;

const classSchema = new Schema({
    name: { type: String, required: true, unique: true },
    teachers: { type: [String] },
    students: { type: [String] },
    periods: { type: [Number] },

}, {
    timestamps: true,
});

const classModel = mongoose.model("ClassModel", classSchema);
module.exports = classModel;