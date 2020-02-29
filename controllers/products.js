const express=require('express');
const router=express.Router();



//import local module
const model=require("../model/product");
const modelCate=require("../model/category"); 


//go to product page and show products depending on client's choice
router.post("/", (req,res)=>{
    console.log(`${req.body.category}`);
    res.render("products",{
        title:"Our Products",
        category:req.body.category,
        data:model.getProducts(req.body.category),
        cateDate:modelCate.getAllCate()
    });

});

//show success message
router.post("/success", (req,res)=>{

    console.log(req.body.order);
    console.log(req.body.oName);
    res.render("success",{
        title:"SUCCESS",
        message:"You have ordered: "+req.body.oName,
        qty:1   
    });
 });

module.exports=router;