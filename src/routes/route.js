const express = require("express");
const { createCustomers, getCustomerById, loginCustomer } = require("../controller/customerController");
const { createOrder } = require("../controller/orderController");

const router = express.Router()



router.post("/customers",createCustomers)
router.get("/customers/:customerId",getCustomerById)
router.post("/orders",createOrder)
router.post("/login",loginCustomer)


module.exports = router