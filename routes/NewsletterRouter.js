const newsletterRouter = require("express").Router()
const { getRecord, createRecord, deleteRecord } = require("../controllers/NewsletterController")
newsletterRouter.get("/",  getRecord)
newsletterRouter.post("/", createRecord)
newsletterRouter.delete("/:_id",  deleteRecord)

module.exports = newsletterRouter
