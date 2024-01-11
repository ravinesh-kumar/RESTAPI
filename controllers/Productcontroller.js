//Model call kro 
// const { log } = require("console")
const Product = require("../models/Product")
const fs = require("fs")
// for all record 
async function getRecord(req, res) {

    try {
        let data = await Product.find().sort({ _id: -1 })  //sort data in descending order
        res.send({ status: 200, result: "Data Received Successfully", count: data.length, data: data })
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }

}
// create data
async function createRecord(req, res) {
    // console.log(req.body);
    // console.log(req.files);
    // res.send("Hello from create record")
    try {
        const data = new Product(req.body);
        // for (let [key, value] of Object.entries(req.files)) {
        //     data[`${key}`] = value[0].filename;
        // }
        // console.log(req.body);
        // console.log(req.files);
        // return;
        if (req.files.pic1) {
            data.pic1 = await req.files.pic1[0].path
        }
        if (req.files.pic2) {
            data.pic2 = await req.files.pic2[0].path
        }
        if (req.files.pic3) {
            data.pic3 = await req.files.pic3[0].path
        }
        if (req.files.pic4) {
            data.pic4 = await req.files.pic4[0].path
        }
        await data.save()
        // data ko JSON me change krne ke liye index.js me add kr do 
        // app.use(express.json())

        // data javascript me send krenge wooo json me change ho jiayega 
        //data iss liye bhejte hai kyuki joo id create hoti hai usko frontend me send krna pdta hai 
        //jisse hum further process like table creation etc ke liye use kr skte hai
        res.send({ status: 200, result: "Data saved Sucessfullly", data: data })
    } catch (error) {
        // console.log(error,error.errors.name);      

        if (error.errors.name)
        //error.errors.name.message here name is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.name.message })
        }
        else if (error.errors.maincategory)
        //error.errors.maincategory.message here maincategory is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.maincategory.message })
        }
        else if (error.errors.subcategory)
        //error.errors.subcategory.message here subcategory is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.subcategory.message })
        }
        else if (error.errors.brand)
        //error.errors.brand.message here brand is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.brand.message })
        }
        else if (error.errors.color)
        //error.errors.color.message here color is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.color.message })
        }
        else if (error.errors.size)
        //error.errors.size.message here size is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.size.message })
        }
        else if (error.errors.baseprice)
        //error.errors.baseprice.message here baseprice is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.baseprice.message })
        }
        else if (error.errors.discount)
        //error.errors.discount.message here discount is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.discount.message })
        }
        else if (error.errors.finalprice)
        //error.errors.finalprice.message here finalprice is in models already define in Models it send the message on frontend 
        {
            res.send({ status: 400, result: "Failed", message: error.errors.finalprice.message })
        }
        else
            res.send({ status: 500, result: "Failed", message: "Internal Server Error" })

    }
}
// for single record
async function getSingleRecord(req, res) {
    let data = await Product.findOne({ _id: req.params._id })

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
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            // agar frontend se data nhi aaiya toh old data push kr do 
            // req.body.name is new data
            //  while data.name is old data
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.size = req.body.size ?? data.size
            data.color = req.body.color ?? data.color
            data.brand = req.body.brand ?? data.brand
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            if (req.files.pic1) {
                try {
                    fs.unlinkSync(data.pic1)
                } catch (error) { }

                data.pic1 = await req.files.pic1[0].path
            }
            if (req.files.pic2) {
                try {
                    fs.unlinkSync(data.pic2)
                } catch (error) { }
                data.pic2 = await req.files.pic2[0].path
            }
            if (req.files.pic3) {
                try {
                    fs.unlinkSync(data.pic3)
                } catch (error) { }
                data.pic3 = await req.files.pic3[0].path
            }

            if (req.files.pic4) {
                try {
                    fs.unlinkSync(data.pic4)

                } catch (error) { }
                data.pic4 = await req.files.pic4[0].path
            }
            await data.save()
            res.send({ status: 200, result: "Data Saved", message: "Data Saved Successfully" })
        }
        else {
            res.send({ status: 500, result: "Data Not Found", message: "Invalid Entry / Data Not Found" })
        }
    } catch (error) {
        console.log(error);
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
        let data = await Product.findOne({ _id: req.params._id })
        if (data) {
            try {
                await fs.unlinkSync(data.pic1)
            } catch (error) { }
            try {
                await fs.unlinkSync(data.pic2)
            } catch (error) { }
            try {
                await fs.unlinkSync(data.pic3)
            } catch (error) { }
            try {
                await fs.unlinkSync(data.pic4)
            } catch (error) { }
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

// async function search(req,res){
//     let search = req.body.search
//     try {
//         let data = await Product.find({
//             $or:[
//                 {name:{$regex:search,$options:"i"}},
//                 {maincategory:search},
//                 {subcategory:search},
//                 {brand:search},
//                 {color:search},
//                 {description:{$regex:search,$options:"i"}}
//             ]
//         })
//         res.send({status:200,result:"Search",count:data.length,data:data})
//     } catch (error) {
//         console.log(error);
//     }
// }


async function search(req, res) {
    let search = req.body.search
    try {
        let data = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { maincategory: search },
                { subcategory: search },
                { brand: search },
                { color: search },
                { size: search },
                { description: { $regex: search, $options: "i" } }
            ]
        })
        res.send({ status: 200, result: "Done", count: data.length, data: data })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "Fail", message: "Internal Server Error" })
    }
}


//kripya export krna naa bhulee
module.exports = {
    getRecord: getRecord,
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    getDataUpdate: getDataUpdate,
    deleteData: deleteData,
    search: search
}