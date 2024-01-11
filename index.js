const express = require("express")
// http://localhost:8080/api/user/forgetpassword1 running on port number
require("dotenv").config()
const app = express()
// to ready json data  pin this line to the top
app.use(express.json())

// we call the router
const router = require("./routes/Router")
app.use("/api", router)

app.set(express.static("./public"))
app.use("/public", express.static("./public"))

require("./DBconnect")


app.listen(8080, () => {
    console.log("server running @ http://localhost:8080")
})