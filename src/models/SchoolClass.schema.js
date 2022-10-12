const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const schoolClassSchema = new Schema({
    name: { type: String, required: true, unique: true },
    teachers: { type: [String] },
    students: { type: [String] },
    periods: { type: [Number] },

}, {
    timestamps: true,
});

const SchoolClass = mongoose.model("SchoolClass", schoolClassSchema);
module.exports = SchoolClass;