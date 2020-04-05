const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proSchema = new Schema({
  title:{type:String, required:true },
  id:{type:String, required:true },
  pic:{type:String, required:true },
  cate:{type:String, required:true },
  unit:{type:String, required:true },
  best:Boolean,
  price:Number
});

const productModel=mongoose.model('product',proSchema);
module.exports=productModel;


