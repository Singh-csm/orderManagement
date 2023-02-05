const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const orderSchema = new mongoose.Schema({
    title : {
        type:String,
        require:true,
        trim:true,
        lowercase:true
    },
    customerId:{
        type:ObjectId,
        ref: "Customer",
        require:true,
        trim:true, 
        lowercase:true
    },
    discription:{
        type : String,
        require:true,
        trim:true,
        lowercase:true
    },
    price:{
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)