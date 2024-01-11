const User = require("../models/User")

var passwordValidator = require('password-validator');

const bcrypt = require("bcrypt")

var schema = new passwordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Password@123', 'User@123']); // Blacklist these values


async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {

    // data liya aur schema se check kr liye ke woo vaild hai ke nhi 
    if (req.body.password && schema.validate(req.body.password)) {
        try {
            const data = new User(req.body)
            // kisko hash krna hai 
            // kittne round hash hoga jittna jada uttna accha 
            // call back function

            bcrypt.hash(req.body.password, 12, async (error, hash) => {
                console.log(error);
                if (error) {
                    res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
                }
                else {
                    data.password = hash
                    await data.save()
                    res.send({ status: 500, result: "Data Saved", data: data })

                }

            })
            // await data.save()
            res.send({ status: 200, result: "Done", data: data })
        } catch (error) {
            if (error.keyValue)
                res.send({ status: 400, result: "Fail", message: "User Name Already Exist" })
            else if (error.errors.name)
                res.send({ status: 400, result: "Fail", message: error.errors.name.message })
            else
                res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
        }
    }
    else {
        res.send({ status: 500, result: "Failed", message: "1:-Minimum length 8 2:- Maximum length 100 3:- Must have uppercase letters 4:-Must have lowercase letters 5:- Must have at least 2 digits 6:- Blacklist these values" })
    }
}

async function getSingleRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data)
            res.send({ status: 200, result: "Done", data: data })
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function updateRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            await data.save()

            // if(req.body.name){
            //     data.name = req.body.name
            //     await data.save()
            // }
            res.send({ status: 200, result: "Done", message: "Record Updated" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        if (error.keyValue)
            res.send({ status: 400, result: "Fail", message: "User Name Already Exist" })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ status: 200, result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
}
