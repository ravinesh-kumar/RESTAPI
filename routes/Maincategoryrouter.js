const mainCategoryRouter = require("express").Router()

// const Maincategory = require("../controllers/Maincategory")
//main category se saare function call kro joo controller me bane hai
const { getRecord, createRecord,
    getSingleRecord, getDataUpdate, deleteData } = require("../controllers/Maincategory")

mainCategoryRouter.get("/", getRecord)
mainCategoryRouter.post("/", createRecord)
mainCategoryRouter.get("/:_id", getSingleRecord)
mainCategoryRouter.put("/:_id", getDataUpdate)
mainCategoryRouter.delete("/:_id", deleteData)

module.exports = mainCategoryRouter

