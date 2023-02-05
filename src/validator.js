
const mongoose = require("mongoose");

const isvalidpassword = function (password) {
    password=password.trim()
    const passwordRegex = 	/^(?=.*\d).{8,15}$/; // atleast one numericdigit
    return passwordRegex.test(password);
};

const isvalidMobileNumber = function (phone) {
    phone=phone.trim()
    const MobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return MobileNumberRegex.test(phone);
};

const isvalidEmail = function (email) {
    email=email.trim()
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const isvaliduserId = function (userId) {
    userId=userId.trim()
    return mongoose.Types.ObjectId.isValid(userId);
  };

  const isvalidName = function (name) {
    name=name.trim()
    const nameRegex = /^[a-zA-Z ][a-zA-Z ]*$/;
    return nameRegex.test(name);
  };

  const isValidTitle = function (title) {
    title=title.trim()
    const regex = /^[A-Za-z0-9\s\-_,\.;:()]+$/
    return regex.test(title)
  }

  const isvalidDate = function (date){
    const regex =/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    return regex.test(date)
  }

  const isvalidISBN = function (value){
    const regex =/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g
    return regex.test(value)
  }

  const isvalidEmpty = function(value){
    const regex =/^\s+$/
    return regex.test(value)
  }
  
  const isvalidRating = function(value){
    const regex =/^\d*(\.\d+)?$/
    return regex.test(value)
  }
  
  const isvalidReview = function(value){
    const regex = /^(?:[\w:\-(),.! ]+)$/
    return regex.test(value)
  }
  
  


module.exports = {
    isvalidpassword,
    isvalidMobileNumber,
    isvalidEmail,
    isvaliduserId,
    isvalidName,
    isValidTitle,
    isvalidDate,
    isvalidISBN,
    isvalidEmpty,
    isvalidRating,
    isvalidReview
};
