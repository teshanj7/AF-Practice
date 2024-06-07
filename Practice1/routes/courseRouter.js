let Course = require("../models/course");
let router = require("express").Router();

//create 
router.route("/").post((req,res)=> {
    const { courseName, courseCode, description, noOfCredits } = req.body;

    const newCourse = new Course ({
        courseName,
        courseCode,
        description,
        noOfCredits
    })

    try{
        newCourse.save()
        res.status(200).json({message: "Created!"})
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error!"})
    }

})

//view all
router.route("/viewAllCourses").get((req, res) => {
    try{
        let courses = Course.find();
        res.json(courses);
    }catch(error){
        console.log(error);
        res.status(400).json({message: "Error!"})
    }
})

//update

router.route("/updateCourse/:id").put( async (req, res) =>{
    let courseId = req.params.id;
    const { courseName, courseCode, description, noOfCredits } = req.body;

    const updateCourse = {
        courseName,
        courseCode,
        description,
        noOfCredits
    }

    try{
        await Course.findByIdAndUpdate(courseId, updateCourse);
        res.status(200).json({message: "Updated successfullY!"});
    }catch(error){
        console.log(error);
    }
})

//delete

router.route("/deleteCourse/:id").delete(async (req, res) => {
    let courseId = req.params.id;

    try{
        await Course.findByIdAndDelete(courseId);
        res.status(200).json({message: "Deleted!"})
    }catch(error){
        console.log(error);

    }
})

//view by id

router.route("/viewCourseById/:id").get( async (req, res) => {
    let courseId = req.params.id;

    try{
        const course = await Course.findById(courseId);
        res.status(200).send(course);
    }catch(error){
        console.log(error);
    }
})

//search

router.route("/searchCourse/:key").get( async (req, res) => {
    try{
        let result = await Course.find({
            "$or": [
                {
                    courseName:{ $regex: req.params.key}
                },
                {
                    courseCode: { $reges: req.params.key}
                }
            ]
        })
        res.status(200).json(result);
    }catch(error){
        console.log(error);
    }
})

//get all courses coursecode c001

router.route("/getC001Course").get( async (req, res) => {
    try{
        const result = await Course.find({courseCode: "C001"})
        res.status(200).json(result);
    }catch(error){
        console.log(error);
    }
})