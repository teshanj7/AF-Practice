const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName : {
        type : String,
        required: true
    },

    courseCode : {
        type : String,
        required: true
    },

    description : {
        type : String,
        required: true
    },

    noOfCredits : {
        type : Number,
        required: true
    }
})

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;