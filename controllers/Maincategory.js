//Model call kro 
const Maincategory = require("../models/Maincategory")

// for all record 
async function getRecord(req, res) {

    try {
        let data = await Maincategory.find().sort({ _id: -1 })  //sort data in descending order
        res.send({ status: 200, result: "Data Received Successfully", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }

}
// create data
async function createRecord(req, res) {

    // console.log(req.body)
    // res.send("Hello from create record")
    try {
        let data = new Maincategory(req.body)
        await data.save()
        // data javascript me send krenge wooo json me change ho jiayega 
        //data iss liye bhejte hai kyuki joo id create hoti hai usko frontend me send krna pdta hai 
        //jisse hum further process like table creation etc ke liye use kr skte hai
        res.send({ status: 200, result: "Data saved Sucessfullly", data: data })
    } catch (error) {
        console.log(error);
        if (error.keyValue)
            res.send({ status: 400, result: "Failed", message: "MainCategory Must Be Unique" })
        else if (error.errors.name)
        //error.errors.name.message here name is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.name.message })
        }
        else
            res.send({ status: 500, result: "Failed", message: "Internal Server Error" })

    }
}
// for single record
async function getSingleRecord(req, res) {
    let data = await Maincategory.findOne({ _id: req.params._id })

    if (data) {
        res.send({ status: 200, result: "Data Found Get Single Record", data: data })
    }
    else {
        res.send({ status: 404, result: "Result", message: "Data Not Found" })
    }
}
// Update Data
async function getDataUpdate(req, res) {
    try {
        let data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            // agar frontend se data nhi aaiya toh old data push kr do 
            // req.body.name is new data
            //  while data.name is old data
            data.name = req.body.name ?? data.name  //important pehle body se name loo
            await data.save()
            res.send({ status: 200, result: "Data Saved", message: "Data Saved Successfully" })
        }
        else {
            res.send({ status: 500, result: "Data Not Found", message: "Invalid Entry / Data Not Found" })
        }
    } catch (error) {
        if (error.keyValue) {
            res.send({ status: 401, result: "failed", message: "Data already Exists" })
        }
        else {
            res.send({ status: 500, result: "Error occured", message: "Internal Server Error at getdataupdate" })
        }
    }
}

async function deleteData(req, res) {
    try {
        let data = await Maincategory.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({ status: 200, result: "Data Delete Successfully", message: "Record Deleted " })
        }
        else {
            res.send({ status: 404, result: "Data Not Found", message: "Data Not Found" })
        }
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }


}

//kripya export krna naa bhulee
module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    getDataUpdate: getDataUpdate,
    deleteData: deleteData
}