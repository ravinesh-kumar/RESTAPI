const jwt = require("jsonwebtoken")

//we verifyadmin ,buyer and both are treated as middleware soo we pass
// 3 parameter
function verifyAdmin(res, req, next) {
    try {
        const token = req.headers.authorization
        if (token && jwt.verify(token, process.env.JWT_SALT_KEY_ADMIN))
            next()
        else
            res.send({ status: 440, result: "Failed", msg: "Unauthorized Access" })
    } catch (error) {
        res.send({ status: 440, result: "Failed", message: "Login Session timeout" })
    }
}

function verifyBuyer(res, req, next) {
    try {
        const token = req.header.authorization
        if (token && verify(token, process.env.JWT_SALT_KEY_BUYER)) {
            next()
        }
        else {
            res.send({ status: 440, result: "Failed", message: "Invalid Entry" })
        }
    } catch (error) {
        res.send({ status: 440, result: "Failed", message: "Login Session Expired" })
    }
}

module.export = {
    verifyAdmin: verifyAdmin,
    verifyBuyer: verifyBuyer

}