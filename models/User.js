const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must required"],

    },
    username: {
        type: String,
        required: [true, "username must required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email must required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "phone must required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password must required"],

    },
    role: {
        type: String,
        // required: [true, "role must required"],
        default: "buyer"

    },
    address: {
        type: String,
        // required: [true, "address must required"],


    },
    pin: {
        type: String,
        // required: [true, "pin must required"],


    },
    city: {
        type: String,
        // required: [true, "city must required"],


    },
    state: {
        type: String,
        // required: [true, "state must required"],


    },
    pic: {
        type: String,
        // required: [true, "pic must required"],


    },

})

const User = new mongoose.model("User", UserSchema)  //file name , schema name
module.exports = User  //file name