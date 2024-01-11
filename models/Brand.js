const mongoose = require("mongoose")

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        unique: true
    }

})

const Brand = new mongoose.model("Brand", BrandSchema)  //file name , schema name
module.exports = Brand  //file name