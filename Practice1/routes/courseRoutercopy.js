const Course = require("../models/course");
const router = require("express").Router();

//create
router.route("/").post((req,res) => {
    const {courseName, courseCode, description, noOfCredits} = req.body;

    const newCourse = new Course ({
        courseName,
        courseCode,
        description,
        noOfCredits
    })

    if(!courseName){
        return res.status(400).json({message: "All fields required"})
    }

    newCourse.save().then(() => {
        res.status(200).json({message: "Course added successfully!"})
    }).catch((err)=> {
        console.log(err);
    })
})

//view all
router.route("/viewAllCourses").get((req, res) => {
    Course.find().then((courses) => {
        res.json(courses);
    }).catch((err)=> {
        console.log(err);
    })
})

//update

router.route("/updateCourse/:id").put(async (req, res) => {
    let userId = req.params.id;

    const updateCourse = {
        courseName,
        courseCode,
        description,
        noOfCredits
    }

    await updateCourse.findByIdAndUpdate(userId).then(() => {
        res.status(200).json({message : "Updated successfullY!"})
    }).catch((err)=> {
        console.log(err);
    })
})

//delete
router.route("/deleteCourse/:id").delete(async (req, res)=> {
    let userId = req.params.id;

    await Course.findByIdAndDelete(userId).then(()=> {
        res.status(200).json({message: "Course deleted!"})
    }).catch((err)=> {
        console.log(err);
    })
})

//view course by id

router.route("/viewCourse/:id").get(async (req, res)=> {
    let userId = req.params.id;

    const Course = await Course.findById(userId).then(()=>{
        res.send(Course);
    }).catch((err)=> {
        console.log(err);
    })
})

//search
router.route("/searchCourse/:id").get(async (req, res) => {
    let result = await Course.find({
        "$or": [
            {
                courseName: { $regex : req.params.key }
            },
            {
                courseCode : { $regex: req.params.key }
            }
        ]
    });

    res.send(result);
})