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
  if(req.body.name==""){
 
        errMessage.name="*Please enter your name*";
        errFlag=false;
    }else{
        okValue.name=req.body.name;
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
  }else{
    okValue.pwd=req.body.pwd;
  }
  
  if(!errFlag){
 
     res.render("signup",{
         title:"SignUp",
         errName:errMessage.name,
         errEmail:errMessage.email,
         errPwd:errMessage.pwd,
         errRepwd:errMessage.repwd,
         value:okValue
     })
  }else{
      console.log(`Name:${req.body.name}`);
      console.log(`Email:${req.body.Email}`);
      console.log(`Password:${req.body.pwd}`);
      res.render("success",{
         title:"SUCCESS",
         message:"You have created a new account!"   
     })
  }
 
 });

 module.exports=router;
