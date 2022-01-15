const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const User = require("./models/users");
var jwt = require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/restapidemo");
const secret = "RESTAPI"


const app = express();
app.use(bodyparser());

app.use("/posts", async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split("Bearer ")[1];
        console.log(token);
        if (!token) {
            return res.status(200).json({
                status: "failed",
                message: "Not valid request"
            })
        }
        jwt.verify(token, secret, async function (err, decoded) {
            console.log(err, decoded);
            if (err) {
                return res.status(500).json({
                    status: "failed",
                    message: "Invalid token"
                })
            }
            const user = await User.findOne({ _id: decoded.data });
            console.log(user);
            req.user = user._id;
            next();
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: "Token not authenticated"
        });
    }
});

app.use("/api/v1/users", userRoutes);
app.use("/", loginRoutes);
app.use("/posts", postRoutes);
app.get('/', (req, res)=>{
    res.send("started")
})
app.listen(3001, () => console.log("Server is started"));