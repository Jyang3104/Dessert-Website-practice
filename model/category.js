
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cateSchema = new Schema({
  //customer:{type:String, required:true },
  category:{type:String, required:true },
  id:{type:String, required:true },
  pic:{type:String, required:true }
});


const cateModel=mongoose.model('category',cateSchema);
module.exports=cateModel;


