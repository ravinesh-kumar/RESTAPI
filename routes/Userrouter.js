const userRouter = require("express").Router()
const multer = require('multer') //npm i multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const { getRecord, createRecord, getSingleRecord, updateRecord, deleteRecord ,forgetPassword1,login} = require("../controllers/Usercontroller")

userRouter.get("/", getRecord)
userRouter.post("/", createRecord)
userRouter.get("/:_id", getSingleRecord)
userRouter.put("/:_id", upload.single("pic"), updateRecord)
userRouter.delete("/:_id", deleteRecord)
userRouter.post("/login", login)
userRouter.post("/forgetpassword1", forgetPassword1)
// userRouter.post("/search", search)

module.exports = userRouter