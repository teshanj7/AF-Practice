const mongoose = require("mongoose");

let dbConnection = null;

function connectToDatabase(URL) {
    if(!dbConnection){
        dbConnection = mongoose.connect(URL, {});

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected succesfully!");
        })

        mongoose.connection.on("error", (error) => {
            console.log(`MongoDb Connection Error : ${error}`);
        })
    }

    return dbConnection;
}

module.exports = connectToDatabase;