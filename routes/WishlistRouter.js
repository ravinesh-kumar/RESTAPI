const wishlistRouter = require("express").Router()
const { getRecord, createRecord, deleteRecord } = require("../controllers/WishlistController")
wishlistRouter.get("/:userid",  getRecord)
wishlistRouter.post("/",  createRecord)
wishlistRouter.delete("/:_id",  deleteRecord)

module.exports = wishlistRouter
