const express=require('express');
const router=express.Router();

const modelBest=require("../model/bestseller");
const modelCate=require("../model/category"); 

//home page
router.get("/", (req,res)=>{
    res.render("home",{
        title:"Home",
        bestData:modelBest.getBestPro(),
        categoryData:modelCate.getAllCate()
    });
 });
 
 //login page
 router.get("/login", (req,res)=>{
     res.render("login",{
         title:"LOGIN",
         headingInfo:"LOGIN"
         
     });
 });


 
//get login information and validate
router.post("/login", (req,res)=>{
    //validate user date
    const errMessage={};
    let errFlag=true;
    const okValue={};
  if(req.body.Email==""){
    errFlag=false;
     errMessage.email="*Please enter your email";
  }else{
      okValue.email=req.body.Email;
  }
 
  if(req.body.pwd==""){
    errMessage.password="*Please enter your password";
    errFlag=false;
}
 
  if(!errFlag){
 
     res.render("login",{
         title:"LOGIN",
         error:errMessage,
         ok:okValue
     })
  }else{
      console.log(`Email:${req.body.Email}`);
      console.log(`Password:${req.body.pwd}`);
      res.render("success",{
         title:"SUCCESS",
         message:"Welcome back!"   
     })
  }
 
 });


 module.exports=router;