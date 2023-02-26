const customerModel = require("../models/customerModel")
const { isvalidName, isvalidEmail, isvalidpassword, isvalidMobileNumber, isvaliduserId } = require("../validator")
// const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const createCustomers = async(req,res)=>{
    try {
    let data = req.body
    if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Provide details for creating your profile"})
    let {name,lname,phone,email, password, ...rest} = data
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"invalid details"})
    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!isvalidName(name)) return res.status(400).send({status:false,message:"given name is invalid"})
    
    if(!lname) return res.status(400).send({status:false,message:"lname is required"})
    if(!isvalidName(lname)) return res.status(400).send({status:false,message:"given name is invalid"})
    
    if(!phone) return res.status(400).send({status:false,message:"phone is required"})
    if(!isvalidMobileNumber(phone)) return res.status(400).send({status:false,message:"Invalid phone no."})
    let findByPhone = await customerModel.findOne({phone}) 
    if(findByPhone) return res.status(400).send({status:false,message:"This phone is alredy exist,enter different phone"})

    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!isvalidEmail(email)) return res.status(400).send({status:false,message:"given email is invalid"})
    let findByEmail = await customerModel.findOne({email}) 
    if(findByEmail) return res.status(400).send({status:false,message:"This email is alredy exist,enter different email"})

    if(!password) return res.status(400).send({status:false,message:"password is required"})
    if(!isvalidpassword(password)) return res.status(400).send({status:false,message:"password must be grater than 8 char and less than 15 char"})
    let hashPassword = await bcrypt.hash(password,10)

    let createCustomerData = {name,lname,phone,email, password : hashPassword} 

    let createCustomer = await customerModel.create(createCustomerData)

    return res.status(201).send({status:true,message:"Success",data:createCustomer})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }

}


const loginCustomer = async(req,res)=>{
    let data = req.body
    if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Provide details for login to your profile"})
    let {email, password, ...rest} = data
    if(Object.keys(rest).length>0) return res.status(400).send({status:false,message:"invalid details"})
   
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!isvalidEmail(email)) return res.status(400).send({status:false,message:"given email is invalid"})

    let findUser = await customerModel.findOne({email:email}) 
    if(!findUser) return res.status(400).send({status:false,message:"user not exist with this email."})
    let userId = findUser._id
    let hashPassword = findUser.password
 
    let checkPassword = await bcrypt.compare(password,hashPassword)

    if(!checkPassword) return res.status(400).send({status:false,message:"given password is invalid"})

    let token  = jwt.sign({userId:userId},"bonus-project-orderMangement",{expiresIn:86400})

    res.status(200).send({status:true,message:"Success",toke:token,userId:userId})
    

}



const getCustomerById = async(req,res)=>{
    try {
        let customerId = req.params.customerId
    if(!customerId) return res.status(400).send({status:false,message:"enter your id for getting profile details "})
    
    if(!isvaliduserId(customerId)) return res.status(400).send({status:false,message:"Invalid Id "})

    let findCustomer = await customerModel.findOne({_id:customerId}) 
    if(!findCustomer) return res.status(404).send({status:false,message:"customer not found "})
    return res.status(200).send({status:true,message:"Success",data:findCustomer})

} catch (error) {

        return res.status(500).send({status:false,message:error.message})
        
    }
}




module.exports = {createCustomers,getCustomerById,loginCustomer}
