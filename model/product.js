const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proSchema = new Schema({
  title:{type:String, required:true },
  id:{type:String, required:true },
  pic:String,
  cate:{type:String, required:true },
  unit:{type:String, required:true },
  best:Boolean,
  price:{type:Number, required:true },
  qty:Number,
  ingredient:String
});

const productModel=mongoose.model('product',proSchema);
module.exports=productModel;


