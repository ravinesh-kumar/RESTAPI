const BrandRouter = require("express").Router()

// const Brand = require("../controllers/Brand")
//main category se saare function call kro joo controller me bane hai
const { getRecord, createRecord ,getSingleRecord,getDataUpdate,deleteData} = require("../controllers/BrandController")

BrandRouter.get("/", getRecord)
BrandRouter.post("/", createRecord)
BrandRouter.get("/:_id", getSingleRecord)
BrandRouter.put("/:_id", getDataUpdate)
BrandRouter.delete("/:_id", deleteData)

module.exports = BrandRouter

