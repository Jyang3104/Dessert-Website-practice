const express=require('express');
const router=express.Router();
const moment = require('moment')


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
                        title:pro.title,
                        id:pro.id,
                        pic:pro.pic,
                        cate:pro.cat,
                        unit:pro.unit,
                        best:pro.best,
                        price:pro.price
                    }
                })
                res.render("products",{
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
                    title:pro.title,
                    id:pro.id,
                    pic:pro.pic,
                    cate:pro.cat,
                    unit:pro.unit,
                    best:pro.best,
                    price:pro.price
                }
            })
            res.render("products",{
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
router.post("/order", (req,res)=>{

    console.log(req.body.oPrice);
    console.log(req.body.oName);
    const addItem={
        products:[]
    };
    addItem.products.push({
        name : req.body.oName,
        price : req.body.oPrice
    });
    
    const order = new orderModel(addItem);
    order.save()
    .then(()=>{
    // render to products page, continue shopping
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
                        title:pro.title,
                        id:pro.id,
                        pic:pro.pic,
                        cate:pro.cat,
                        unit:pro.unit,
                        best:pro.best,
                        price:pro.price
                    }
                })
                res.render("products",{
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
    .catch(err=>console.log(`ERROR SAVE ORDER: ${err}`));    
 });

 router.get("/checkout", (req,res)=>{

    orderModel.find({isfinished:false})
    .then((orders)=>{
     
     const filterOrder=orders.map(order=>{
         return {
             name:order.products[0].name,
             price:order.products[0].price  
         }
     });

     //use moment to format date, not change origin date, using in one line
     console.log(moment(orders[0].date).format('YYYY/MM/DD'));

     res.render("checkout",{
         massege:"Your shopping cart!",
         data:filterOrder
     });
    })
    .catch(err=>console.log(`ERROR order: ${err}`))
     
  });

module.exports=router;