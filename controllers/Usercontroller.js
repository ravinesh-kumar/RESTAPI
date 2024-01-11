const User = require("../models/User")
const passwordValidator = require('password-validator')
const bcrypt = require("bcrypt")
const fs = require("fs");
// const jwt = require("jsonwebtoken")
const jwt = require("jsonwebtoken")



const schema = new passwordValidator();
//yeeh code password validation se paste kr lo 
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(30)                                   // Maximum length 30
    .has().uppercase(1)                             // Must have 1 uppercase letters
    .has().lowercase(1)                             // Must have 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'nitin@123', 'User123', 'User@123']); // Blacklist these values

async function getRecord(req, res) {
    try {
        let data = await User.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    if (req.body.password && schema.validate(req.body.password)) { //check kro data aur schema
        const data = new User(req.body)  //table call kro usme data pas kr do
        bcrypt.hash(req.body.password, 12, async (error, hash) => {  //password hash kro 
            if (error)
                res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
            else {
                data.password = hash //hash value ko password me dal do 
                try {
                    await data.save()
                    res.send({ status: 200, result: "Done", data: data })
                }
                catch (error) {
                    console.log(error.keyValue);
                    if (error.keyValue && error.keyValue.username)
                        res.send({ status: 400, result: "Fail", message: "User Name Already Taken" })
                    else if (error.keyValue && error.keyValue.email)
                        res.send({ status: 400, result: "Fail", message: "Email Address Already Taken" })
                    else if (error.errors.name)
                        res.send({ status: 400, result: "Fail", message: error.errors.name.message })
                    else if (error.errors.email)
                        res.send({ status: 400, result: "Fail", message: error.errors.email.message })
                    else if (error.errors.phone)
                        res.send({ status: 400, result: "Fail", message: error.errors.phone.message })
                    else
                        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
                }
            }
        })
    }
    else
        res.send({
            status: 400, result: "Fail", message: "Password Must Contains Following Items 1. Minimum length 2. Maximum length 3. Must have 1 uppercase letters 4. Must have 1 lowercase letters 5. Must have at least 1 digits 6. Should not have spaces"
        })
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
            // new id and old id 
            data.name = req.body.name ?? data.name
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state

            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
            }
            await data.save()
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
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
            await data.deleteOne()
            res.send({ status: 200, result: "Done", message: "Record is Deleted" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function login(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]
        })
        // console.log(req.body.username);

        if (data) {
            console.log(data);

            if (await bcrypt.compare(req.body.password, data.password)) {

                let key = (data.role == "Admin") ? process.env.JWT_SALT_KEY_ADMIN : process.env.JWT_SALT_KEY_BUYER
                jwt.sign({ data }, key, { expiresIn: 1296000 }, (error, token) => {
                    if (error) {
                        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
                    }
                    else {
                        res.send({ status: 200, result: "Successful", data: data, token: token })
                    }
                })
            }
            else
                res.send({ status: 401, result: "Fail", message: "Invalid Username or Password" })
        }
        else
            res.send({ status: 401, result: "Fail", message: "Invalid Username or Password" })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

// async function login(req, res) {
//     try {
//         let data = await User.findOne({
//             $or: [
//                 // email yaa username dono se login kr skta hai user
//                 { username: req.body.username },
//                 { email: req.body.username }
//             ]
//         })
//         if (data) {
//             console.log(data.password);
//             if (await bcrypt.compare(req.body.password, data.password)) {
//                 res.send({ status: 200, result: "Successfull", message: "Login Successfully", data: data })
//             }
//             else {
//                 console.log(req.body.password);
//                 console.log(data.password);
//                 res.send({ status: 401, result: "Failed", message: "Username and Password is Invalid" })
//             }

//         }

//         else {
//             res.send({ status: 401, result: "Failed", message: "username or Password is Invalid" })
//         }


//     } catch (error) {
//         console.log(error);
//         res.send({ status: 404, result: "failed", message: "Internal Server Error" })
//     }
// }
async function forgetPassword1(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username }
            ]

        })
        // console.log(req.body.username);

        if (data) {
            let otp = parseInt(Math.random() * 1000000)
            // let otp = Math.random() *1000  //value generate krta hai between 0-1 ke mid me 
            console.log(otp);
            // return;
            data.otp = otp
            await data.save()
            mailOptions = {
                from: "karmadjango@gmail.com",
                to: data.email,
                subject: "OTP for Password Reset : Team Kifayti",
                text: `
                        Hello ${data.name}
                        OTP for Password Reset is ${data.otp}
                        Please Never Share Your OTP With anyone
                        Team : kifayti
                    `
            }
            transporter.sendMail(mailOptions, ((error) => {
                if (error) {
                    console.log(error)
                    // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
                }
            }))
            res.send({ status: 200, result: "Done", message: "OTP Sent on Your Registered Email Address" })

        }
        else {
            res.send({ status: 401, result: "Failed", message: "Username and Password Doesnt Match" })
        }
    } catch (error) {
        console.log(error);
        res.send({ status: 404, result: "Failed", message: "Internal Server Error" })
    }
}


module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    login: login,
    forgetPassword1: forgetPassword1
}

