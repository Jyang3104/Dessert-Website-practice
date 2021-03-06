const express=require('express');
const router=express.Router();
const cusModel=require("../model/signup");
const orderModel=require("../model/orders");

 //go to signup page
 router.get("/", (req,res)=>{
    res.render("signup",{
        title:"SignUp"   
    });
});

 //get register data and validate
router.post("/", (req,res)=>{
    //validate user date
  
   cusModel.findOne({email:req.body.Email})
   .then((cus)=>{
    
    const errMessage={};
    const okValue={};
    let errFlag=true;
    const regularExpression  = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;
    const emailReg=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
  if(req.body.fname==""){
 
        errMessage.fname="*Please enter your first name*";
        errFlag=false;
    }else{
        okValue.fname=req.body.fname;
    }

    if(req.body.lname==""){
 
        errMessage.lname="*Please enter your last name*";
        errFlag=false;
    }else{
        okValue.lname=req.body.lname;
    }

  if(req.body.Email==""){
     errMessage.email="*Please enter your email*";
     errFlag=false;
  }else if(!emailReg.test(req.body.Email.toUpperCase())){
     errMessage.email="*Not valid email address*";
     errFlag=false;
  }else if(cus!=null){
    errMessage.email="*Account already exists*";
    errFlag=false;
  }else{
      okValue.email=req.body.Email;
  }
 
  if(req.body.pwd==""){
  errMessage.pwd="*Please enter password*";
  errFlag=false;
}else if(!regularExpression.test(req.body.pwd)){
    errMessage.pwd="*Password must have 8-16 characters, and contain number, letter and special character.*";
    errFlag=false;
}
 
  if(req.body.pwd!=req.body.pwd2){
      errMessage.repwd="*Password Does Not Match.*";
      errFlag=false;
  }else if(regularExpression.test(req.body.pwd)){
    okValue.pwd=req.body.pwd;
  }
  
  if(!errFlag){
 
     res.render("signup",{
         title:"SignUp",
         err:errMessage,
         value:okValue
     })
  }else{   
      const {fname,lname, Email, pwd}=req.body;
 
            const newCustomer={
                firstName:fname,
                lastName:lname,
                email:Email,
                password:pwd
            };
             
         const customer = new cusModel(newCustomer);
         customer.save()
         .then(()=>{
            
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
            

         })
         .catch(err=>console.log(`ERROR insert DB:${err}`));           
           
  }      
   })
   .catch(err=>console.log(`ERR  CK EXIST ACCOUNT ${err}`))
 });

 module.exports=router;
