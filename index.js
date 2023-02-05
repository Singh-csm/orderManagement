const { urlencoded } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const multer = require("multer");

mongoose.set('strictQuery', false);

const router = require("./src/routes/route");
const app = express()
app.use(express.json(urlencoded({extended:true})))
app.use(multer().any())

const dbConnection = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://singh-csm:GIUPM5681K@singh-csm.nmfw5jk.mongodb.net/orderManagement",{useNewUrlParser:true})
        console.log("database connected");
    } catch (error) {
        console.log("error while connecting database");
    }
}


app.use("/",router)

dbConnection()





app.listen(3000,()=>{
    console.log("Server Started for Order Management");
})