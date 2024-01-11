const mongoose = require("mongoose")

const SubcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "SubCategory name Must required"],
        unique: true
    }

})

const Subcategory = new mongoose.model("Subcategory", SubcategorySchema)  //file name , schema name
module.exports = Subcategory  //file name