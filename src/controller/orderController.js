const { isValidObjectId } = require("mongoose");
const customerModel = require("../models/customerModel");
const { findOneAndUpdate } = require("../models/orderModel");
const orderModel = require("../models/orderModel");
const { isValidTitle, isvalidRating } = require("../validator");


const createOrder = async(req,res)=>{

    let data = req.body
    if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Provide details for creating your profile"})
    let {title,customerId,discription,price,...rest} = data
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"invalid details"})

    if (!title)  return res.status(400).send({ status: false, message: "title is required" }) 
    if(!isValidTitle(title)) return res.status(400).send({ status: false, message: "title is invalid" }) 

    if(!customerId)  return res.status(400).send({ status: false, message: "customerId is required" }) 
    if(!isValidObjectId(customerId)) return res.status(400).send({status:false,message:"Invalid customerId "})

    if(!discription) return res.status(400).send({ status: false, message: "discription is required" }) 
    if(!isValidTitle(discription)) return res.status(400).send({status:false,message:"Invalid discription details "})

    if(!price) return res.status(400).send({ status: false, message: "price is required" }) 
    if(!isvalidRating(price)) return res.status(400).send({ status: false, message: "discription is invalid, must be number" }) 

    let orderDetails = {title,customerId,discription,price} 
    let createOrder = await orderModel.create(orderDetails)
    let updateOrder = await customerModel.findOneAndUpdate({_id:customerId},{$inc:{orders:1}})
    let customerOrder = await customerModel.findOne({_id:customerId})

    let ordersCount = customerOrder.orders
    let goldDiscount = ((price * 10) / 100) + customerOrder.wallet
    let platinumDiscount = ((price * 20) / 100 ) + customerOrder.wallet
   

    if(ordersCount>10 && ordersCount<=20) {
     await customerModel.findOneAndUpdate({_id:customerId},{$set:{wallet:goldDiscount,role:"gold"}})
     await orderModel.findOneAndUpdate({customerId:customerId},{$set:{discount:10}})
    }
    if(ordersCount>20) {
     await customerModel.findOneAndUpdate({_id:customerId},{$set:{wallet:platinumDiscount,role:"platinum"}})
     await orderModel.findOneAndUpdate({customerId:customerId},{$set:{discount:20}})
    }

  let {discount,...otherData} = createOrder._doc
   
    return res.status(201).send({status:true,message:"Success",data:otherData})

}

module.exports = {createOrder}