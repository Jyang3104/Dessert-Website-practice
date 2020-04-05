const express=require('express');
const router=express.Router();
const cateModel=require("../model/category"); 
const proModel=require("../model/product");

//home page
router.get("/", (req,res)=>{

    cateModel.find()
    .then((cates)=>{
        console.log(cates[1].id);
        const filterCate=cates.map(cate=>{
            return {
                category:cate.category,
                id:cate.id,
                pic:cate.pic
            }
        })
         
        proModel.find({best:true})
        .then((bestPro)=>{
        console.log(bestPro[2].id);
        const filterPro=bestPro.map(bestP=>{
            return{
                title:bestP.title,
                id:bestP.id,
                pic:bestP.pic,
                cate:bestP.cat,
                unit:bestP.unit,
                best:bestP.best,
                price:bestP.price
            }
        })

        res.render("home",{
        title:"Home",
        bestData:filterPro,
        categoryData:filterCate
        })
      })
      .catch(err=>console.log(`ERROR PRODUCT: ${err}`))
    })
    .catch(err=>console.log(`ERROR CATEGORY: ${err}`))

    


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