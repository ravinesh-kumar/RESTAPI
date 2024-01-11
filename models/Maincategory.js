const mongoose = require("mongoose")

const MaincategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        unique: true
    }

})

const Maincategory = new mongoose.model("Maincategory", MaincategorySchema)  //file name , schema name
module.exports = Maincategory  //file name