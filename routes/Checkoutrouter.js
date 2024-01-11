const checkoutRouter = require("express").Router()
const { getRecord, createRecord, updateRecord, deleteRecord, getUserRecord, getSingleRecord } = require("../controllers/CheckoutController")


checkoutRouter.get("/",  getRecord)          //all record for admin
checkoutRouter.get("/user/:userid",  getUserRecord)//all record of user
checkoutRouter.get("/:_id",  getSingleRecord)//single record
checkoutRouter.post("/",  createRecord)
checkoutRouter.put("/:_id",  updateRecord)
checkoutRouter.delete("/:_id",  deleteRecord)

module.exports = checkoutRouter
