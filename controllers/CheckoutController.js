const Checkout = require("../models/Checkout")
const User = require("../models/User")
const transporter = require("../mailTransporter")

async function getRecord(req, res) {
    try {
        let data = await Checkout.find().sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function getUserRecord(req, res) {
    try {
        let data = await Checkout.find({userid:req.params.userid}).sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}
async function getSingleRecord(req, res) {
    try {
        let data = await Checkout.findOne({_id:req.params._id}).sort({ _id: -1 })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function createRecord(req, res) {
    try {
        const data = new Checkout(req.body)
        data.date = new Date()
        await data.save()
        res.send({ status: 200, result: "Done", data: data })

        const user = await User.findOne({_id:data.userid})
        mailOptions = {
            from: process.env.MAIL_SENDER,
            to: user.email,
            subject: "Order is Placed : Team Kifayti",
            text: `
                    Hello ${user.name}
                    Thanks to Shop With Us. 
                    Your Order has Been Placed
                    Now You tract your order in profile seciton
                    Team : kifayti
                `
        }
        transporter.sendMail(mailOptions, ((error) => {
            if (error) {
                console.log(error)
                // res.send({ status: 401, result: "Fail", message: "Invalid Email Address" })
            }
        }))
    } catch (error) {
        if (error.errors.userid)
            res.send({ status: 400, result: "Fail", message: error.errors.userid.message })
        else if (error.errors.subtotal)
            res.send({ status: 400, result: "Fail", message: error.errors.subtotal.message })
        else if (error.errors.shipping)
            res.send({ status: 400, result: "Fail", message: error.errors.shipping.message })
        else if (error.errors.total)
            res.send({ status: 400, result: "Fail", message: error.errors.total.message })
        else
            res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.orderstatus = req.body.orderstatus ?? data.orderstatus
            data.paymentmode = req.body.paymentmode ?? data.paymentmode
            data.paymentstatus = req.body.paymentstatus ?? data.paymentstatus
            data.rppid = req.body.rppid ?? data.rppid
            await data.save()
            res.send({ status: 200, result: "Done", message: "Record Updated" })
        }
        else
            res.send({ status: 404, result: "Result", message: "Record Not Found" })
    } catch (error) {
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await Checkout.findOne({ _id: req.params._id })
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
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getUserRecord:getUserRecord,
    getSingleRecord:getSingleRecord
}