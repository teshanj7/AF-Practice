const express = require("express");
const bodyParser = require("bodyParser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//port initialization
const PORT = process.env.PORT || 8070;

//app middlewares
app.use(cors());
app.use(bodyParser.json());

//database connection 
const databaseConnection = require('./config/databaseConnect');

databaseConnection(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Server is up running on port number : ${PORT}`);
})

//implementing the routes
const courseRouter = require('./routes/CourseRouter');
app.use("/course", courseRouter);

