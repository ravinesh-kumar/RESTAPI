const subCategoryRouter = require("express").Router()

// const Maincategory = require("../controllers/Maincategory")
//main category se saare function call kro joo controller me bane hai
const { getRecord, createRecord ,getSingleRecord,getDataUpdate,deleteData} = require("../controllers/Subcategory") //coming from controller

subCategoryRouter.get("/", getRecord)
subCategoryRouter.post("/", createRecord)
subCategoryRouter.get("/:_id", getSingleRecord)
subCategoryRouter.put("/:_id", getDataUpdate)
subCategoryRouter.delete("/:_id", deleteData)

module.exports = subCategoryRouter

