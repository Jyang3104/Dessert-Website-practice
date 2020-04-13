const express=require('express');
const router=express.Router();
const cateModel=require("../model/category"); 
const proModel=require("../model/product");
const cusModel=require("../model/signup");
const orderModel=require("../model/orders");
const bcrypt=require('bcryptjs');

//home page
router.get("/", (req,res)=>{

    cateModel.find()
    .then((cates)=>{
    
        const filterCate=cates.map(cate=>{
            return {
                category:cate.category,
                id:cate.id,
                pic:cate.pic
            }
        })
         
        proModel.find({best:true})
        .then((bestPro)=>{
       
        const filterPro=bestPro.map(bestP=>{
            return{
                mId:bestP._id,
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

 //logout 

 router.get("/logout", (req,res)=>{
     req.session.destroy();
     res.redirect("/");
 });

 
//get login information and validate
router.post("/login", (req,res)=>{
    //validate user date
    const errMessage=[];
    cusModel.findOne({email:req.body.Email})
    .then((customer)=>{
         if(customer==null){
             errMessage.push("*INCORRECT EMAIL/PASSWORD*");
             res.render("login",{
                title:"LOGIN",
                error:errMessage
             });
         }else{
           bcrypt.compare(req.body.pwd,customer.password)
           .then((matched)=>{
                if(matched){
                    //if there is no unfinished order under this customer, then create
                    orderModel.findOne({
                        $and:
                         [{customer:customer.email},
                          {isfinished:false}]})
                        .then(order=>{
                            if(order==null){
                                const newOrder={
                                    customer:customer.email,
                                    products:[]
                                }
                                const order=new orderModel(newOrder);
                                order.save()
                                .then(()=>{
                                req.session.userlogin=customer;           
                                res.redirect("/customer/userdashboard");
                                })
                                .catch(err=>console.log(`ERR NEW ORDER: ${err}`))
                            }else{
                            req.session.userlogin=customer;
                            res.redirect("/customer/userdashboard");}
                        })
                        .catch(err=>console.log(`ERR FIND UNFINISHED ORDER: ${err}`))

                }else{
                    errMessage.push("*INCORRECT EMAIL/PASSWORD*");
                    res.render("login",{
                    title:"LOGIN",
                    error:errMessage
             });
                }
           })
           .catch(err=>console.log(`ERR PWD HASH: ${err}`))
         }
    })
    .catch(err=>console.log(`ERR FIND EMAIL: ${err}`))   
 });

 
 
 module.exports=router;