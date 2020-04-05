const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  //customer:{type:String, required:true },
  products: [{ name: String, price: Number}],
  date: { type: Date, default: Date.now, required:true },
  isfinished:{
    type:Boolean,
    default:false,
    required:true
  }
});


const orderModel=mongoose.model('order',orderSchema);
module.exports=orderModel;