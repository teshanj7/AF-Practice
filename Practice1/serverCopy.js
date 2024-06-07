const express = require("express");
const cors = require("cors");
const bodyParser = require("bodyParser");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const databaseConnection = require("./config/connect");
databaseConnection(process.env.MONGODB_URL);

app.listen(PORT, () =>{
    console.log(`Server is up and running on PORT : ${PORT}`);
})

//routers
const courseRouter = require("./router/courseRouter");
app.use("/course", courseRouter);