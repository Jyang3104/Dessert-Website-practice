const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcryptjs')

const cusSchema = new Schema({
  firstName: {type:String, required:true },
  lastName:{type:String, required:true },
  email:{type:String, required:true },
  password:{type:String, required:true },
  user:{ type:String, default:"customer", required:true }
});

cusSchema.pre("save", function(next){
  bcrypt.genSalt(10)
  .then((salt)=>{
    bcrypt.hash(this.password,salt)
    .then((encrypt)=>{
      this.password=encrypt;
      next();
    })
    .catch(err=>console.log(`ERR HASH: ${err}`))
  })
  .catch(err=>console.log(`ERR GENERATE SALT: ${err}`))
})
const customerModel=mongoose.model('customer',cusSchema);
module.exports=customerModel;