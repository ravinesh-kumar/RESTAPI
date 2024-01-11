const cartRouter = require("express").Router()
const { getRecord, createRecord, updateRecord, deleteRecord } = require("../controllers/CartController")
// const { verifyBuyer } = require("../verification")

cartRouter.get("/:userid",  getRecord)
cartRouter.post("/",  createRecord)
cartRouter.put("/:_id",  updateRecord)
cartRouter.delete("/:_id",  deleteRecord)

module.exports = cartRouter
