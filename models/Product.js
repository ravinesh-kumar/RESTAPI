const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],

    },
    maincategory: {
        type: String,
        required: [true, "Please provide the maincategory"],

    },
    subcategory: {
        type: String,
        required: [true, "Please provide the subcategory"],

    },
    size: {
        type: String,
        required: [true, "Please provide the size"],

    },
    color: {
        type: String,
        required: [true, "Please provide the color"],

    },
    // description: {
    //     type: String,
    //     required: [true, "Please provide the description"],

    // },
    brand: {
        type: String,
        required: [true, "Please provide the brand"],

    },

    baseprice: {
        type: Number,
        required: [true, "Please provide the baseprice"],

    },
    discount: {
        type: Number,
        required: [true, "Please provide the discount"],

    },
    finalprice: {
        type: Number,
        required: [true, "Please provide the finalprice"],

    },
    pic1: {
        type: String,
        default: ""

    },
    pic2: {
        type: String,
        default: ""

    },
    pic3: {
        type: String,
        default: ""

    },
    pic4: {
        type: String,
        default: ""

    },
    stock: {
        type: String,
        default: "In stock"

    },
    description: {
        type: String,
        default: ""

    },

})

const Product = new mongoose.model("Product", ProductSchema)  //file name , schema name
module.exports = Product  //file name