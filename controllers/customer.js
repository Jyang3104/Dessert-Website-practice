const express=require('express');
const router=express.Router();
const moment = require('moment');
const orderModel=require("../model/orders");
const isAuth=require("../middleware/auth");
const dashboardLoader=require("../middleware/authorization");

router.get("/userdashboard", isAuth,dashboardLoader);
router.post("/userdashboard",isAuth, (req,res)=>{
     
    orderModel.find({
        $and:
         [{customer:req.body.email},
          {isfinished:true}]})
    .then((orders)=>{
        orders.sort((o1,o2)=>{
            let r;
            if(o1>o2){
                r=-1;
            }else{
                r=1;
            }
            return r;
        });
        const filterOrds=orders.map(order=>{
            return{
                date:moment(order.date).format('YYYY/MM/DD'),
                products:order.products
            }
        })
       
        res.render("userdashboard",{
            data:filterOrds         
        })
    })
    .catch(err=>console.log(`ERR HISTORY: ${err}`))
});

//place order
router.post("/placeOrder",isAuth, (req,res)=>{
    orderModel.findOne({
        $and:
         [{customer:req.body.email},
          {isfinished:false}]})
          .then((order)=>{
              const closeOdr={
                  isfinished:true
              }
              orderModel.updateOne({_id:order._id},closeOdr)
              .then(()=>{
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                to:`${order.customer}`,
                from: 'jyang219@myseneca.ca',
                subject: 'Your Order',
                html: 
                `<strong>Your Order:${order.products[0].name}</strong>
                 <div>item: ${order.products[0].name}</div>
                 <div>price: ${order.products[0].price}</div>
                `,
                };
                sgMail.send(msg)
                .then(()=>{
                    res.redirect("/customer/userdashboard");
                })
                .catch(err=>console.log(`ERR SEND EMAIL: ${err}`))
              })
              .catch(err=>console.log(`ERR CLOSE: ${err}`))
          })
          .catch(err=>console.log(`ERR CLOSE ORDER: ${err}`))

  });

  //remove item from order
 router.post("/remove",isAuth,(req,res)=>{
    
    orderModel.findById(req.body.oid)
     .then(order=>{
        
         orderModel.updateOne({_id:order._id},
            { $pull: { products : { name:req.body.name } } },
            { multi: true } )
        .then(()=>{
            res.redirect("/products/checkout");           
        })
        .catch(err=>console.log(`ERR update order: ${err}`))
         
     })
     .catch(err=>console.log(`ERR FIND ORDER: ${err}`))
 });
module.exports=router;