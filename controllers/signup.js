const express=require('express');
const router=express.Router();

 //go to sinup page
 router.get("/", (req,res)=>{
    res.render("signup",{
        title:"SignUp"   
    });
});

 //get register data and validate
router.post("/", (req,res)=>{
    //validate user date
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
     errMessage.email="*Not valid email address*"
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
      console.log(fname,lname,Email,pwd);
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: 'jyang219@myseneca.ca',
        from: `${Email}`,
        subject: 'New customer',
        html: 
        `<strong>Customer first name:${fname}</strong>
        <strong>Customer last name:${lname}</strong>
        <strong>Customer password:${pwd}</strong>
        <strong>Email:${Email}</strong>`,
        };
        sgMail.send(msg)
        .then(()=>{
             res.render("success",{
                title:"SUCCESS",
                message:`${fname} ${lname} Welcome to Amami Dessert!`   
            })
        })
        .catch(err=>{
            console.log(`ERR: ${err}`);
        })



      
  }
 
 });

 module.exports=router;
