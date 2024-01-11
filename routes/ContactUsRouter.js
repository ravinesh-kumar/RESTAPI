const contactUsRouter = require("express").Router()
const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord } = require("../controllers/ContactUsController")


contactUsRouter.get("/",  getRecord)
contactUsRouter.post("/", createRecord)
contactUsRouter.get("/:_id",  getSingleRecord)
contactUsRouter.put("/:_id",  updateRecord)
contactUsRouter.delete("/:_id",  deleteRecord)

module.exports = contactUsRouter
