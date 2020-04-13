const express=require('express');
const router=express.Router();
const moment = require('moment');
const isAuth=require("../middleware/auth");

//import local module
const proModel=require("../model/product");
const cateModel=require("../model/category"); 
const orderModel=require("../model/orders");

//go to product page and show products depending on client's choice
router.post("/", (req,res)=>{
    // get category data from mongoDB to list all categories' options
    cateModel.find()
    .then((cates)=>{
        const filterCate=cates.map(cate=>{
            return {
                category:cate.category,
                id:cate.id,
                pic:cate.pic
            }
        })

        //When category is 'all' show all products
        if(req.body.category=="all"){
            proModel.find()
            .then((pros)=>{

                const filterPro=pros.map(pro=>{
                    return{
                        mId:pro._id,
                        title:pro.title,
                        id:pro.id,
                        pic:pro.pic,
                        cate:pro.cat,
                        unit:pro.unit,
                        best:pro.best,
                        price:pro.price
                    }
                })
                res.render("product/products",{
                title:"Our Products",
                category:req.body.category,
                data:filterPro,
                cateData: filterCate  
                });
            })
            .catch(err=>console.log(`ERR ALL PRODUCT: ${err}`))
           
        }else{
        // Select data to show the products under the category user chose
        proModel.find({cate:req.body.category})
        .then((proCs)=>{
            const filterProC=proCs.map(pro=>{
                return{
                    mId:pro._id,
                    title:pro.title,
                    id:pro.id,
                    pic:pro.pic,
                    cate:pro.cat,
                    unit:pro.unit,
                    best:pro.best,
                    price:pro.price
                }
            })
            res.render("product/products",{
            title:"Our Products",
            category:req.body.category,
            data:filterProC,
            cateData: filterCate  
            });
        })
        .catch(err=>console.log(`ERR PRODUCT: ${err}`))
        }
      
    })
    .catch(err=>console.log(`ERROR CATEGORY: ${err}`))

});

//store the customer's choice into mongoDB
router.put("/order", (req,res)=>{
    
    orderModel.findOne({
        $and:
         [{customer:req.body.email},
          {isfinished:false}]})
        .then(order=>{
        const newOrder={
            products:order.products
        };
        newOrder.products.push({
        name : req.body.oName,
        price : req.body.oPrice,
        pic  :req.body.oPic
       }) 

        orderModel.updateOne({_id:order._id},newOrder)
        .then(()=>{
              cateModel.find()
              .then((cates)=>{
             const filterCate=cates.map(cate=>{
                return {
                category:cate.category,
                id:cate.id,
                pic:cate.pic
                }
            })
              proModel.find()
              .then((pros)=>{
                const filterPro=pros.map(pro=>{
                    return{
                        mId:pro._id,
                        title:pro.title,
                        id:pro.id,
                        pic:pro.pic,
                        cate:pro.cat,
                        unit:pro.unit,
                        best:pro.best,
                        price:pro.price
                    }
                })
                res.render("product/products",{
                title:"Our Products",
                category:req.body.category,
                data:filterPro,
                cateData: filterCate  
                });
            })
            .catch(err=>console.log(`ERR AFTER ORDER, ALL PRODUCT: ${err}`))
      
    })
    .catch(err=>console.log(`ERROR AFTER ORDER,CATEGORY: ${err}`))
       })
       .catch(err=>console.log(`ERR UPDATE ONE: ${err}`))
    })

    .catch(err=>console.log(`ERR FIND TO UPDATE: ${err}`))



    
  
    
      
 });

 //go to detail page
 router.get("/detail/:mId",isAuth, (req,res)=>{
    proModel.findById(req.params.mId)
    .then((pro)=>{
     
        const {title,id,pic,cate,unit,best,price,ingredient}=pro;

    res.render("product/detail",{
        title,
        id,
        pic,
        cate,
        unit,
        best,
        price,
        ingredient
        });
    })
    .catch(err=>console.log(`ERR DETAIL: ${err}`))
 });


 //click cart icon 
 router.get("/checkout", isAuth,(req,res)=>{
     res.render("checkout");
 })
 router.post("/checkout", isAuth,(req,res)=>{
   
    orderModel.findOne({
        $and:
         [{customer:req.body.email},
          {isfinished:false}]})
    .then((order)=>{
     if(order==null){
       const errMessage="No Item in your shopping cart!"
       res.render("checkout",{
        massege:errMessage  
        });
     }else{
     const {customer,date,products,_id}=order;
     const filterPros=products.map(pro=>{
         return{
         oid:order._id,
         name:pro.name,
         price:pro.price,
         pic:pro.pic
        }
     })
     //use moment to format date, not change origin date, using in one line
     
     let total=0.00;
     products.forEach(element => {
         total=total+element.price;
     });
     res.render("checkout",{
         customer,
         oid:_id,
         date:moment(date).format('YYYY/MM/DD'),
         products:filterPros,
         total: Math.round(total*100)/100
     });
    } 
    })
    .catch(err=>console.log(`ERROR order: ${err}`))   
  });


module.exports=router;