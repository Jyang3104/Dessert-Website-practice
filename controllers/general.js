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
    const errMessage=[];
  if(req.body.Email==""){
 
     errMessage.push("Please enter Your Email.");
  }
 
  if(req.body.pwd==""){
  errMessage.push("Please enter password.");}
 
  if(errMessage.length>0){
 
     res.render("login",{
         title:"LOGIN",
         error:errMessage
     })
  }else{
      console.log(`Email:${req.body.Email}`);
      console.log(`Password:${req.body.pwd}`);
      res.render("success",{
         title:"SUCCESS",
         message:"You have logged in successfuly!"   
     })
  }
 
 });


 module.exports=router;