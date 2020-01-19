var express = require('express');
var bodyParser = require('body-parser');
var fileupload = require('express-fileupload');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");


mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_ATLAS_PW+'@cluster0-tzfkx.mongodb.net/test?retryWrites=true&w=majority',{
    useMongoClient: true
});

const app = express();
app.use(bodyParser.json());
app.use(fileupload());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested_With, Content-Type, Accept, Authorization"
    );

    if(req.mehtod === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/user",userRoutes);
app.use("/upload",uploadRoutes);

module.exports = app;
