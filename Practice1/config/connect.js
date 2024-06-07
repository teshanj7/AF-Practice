const mongoose = require("mongoose");

let dbConnection = null;

function connectToDatabase(URL){
    if(dbConnection == null){
        dbConnection = mongoose.connect(URL, {});

        mongoose.connect.on("connected", () => {
            console.log("MongoDB connected successfully!");
        })

        mongoose.connect.on("error", (error) => {
            console.log(`Connection error : ${error}`);
        })
    }

    return dbConnection;
}

module.exports = connectToDatabase;