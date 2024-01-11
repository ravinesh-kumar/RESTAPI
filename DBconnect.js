const mongoose = require("mongoose")

async function getConnected() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/restapi-server")
        console.log("DataBase is Connected");
    } catch (error) {
        console.log(error);
    }
}
getConnected()

// (function () { console.log("hello from database") }())




// mongodb://localhost:27017