const { default: mongoose } = require("mongoose");

const costomerSchema = new mongoose.Schema({
    name:{
        type : String,
        require:true,
        trim:true
    },
    lname:{
        type : String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    email:{
        type : String,
        require:true,
        unique:true,
        trim:true
    },
    password:{
        type : String,
        require:true,
        trim:true
    },

    role:{
        type:String,
        default:"regular"
    },
    orders:{
        type : Number,
        default:0
    },
    wallet:{
        type:Number,
        default:0
    }
  
},{timestamps:true})


module.exports = mongoose.model("Customer", costomerSchema)