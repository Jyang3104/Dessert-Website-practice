const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cusSchema = new Schema({
  firstName: {type:String, required:true },
  lastName:{type:String, required:true },
  email:{type:String, required:true },
  password:{type:String, required:true },
});

const customerModel=mongoose.model('customer',cusSchema);
module.exports=customerModel;