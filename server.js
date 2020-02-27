const exp=require("express");
const app= exp();
const exphbs  = require('express-handlebars');
const bodyParser=require('body-parser');

//import local module
const model=require("./model/product");
const modelBest=require("./model/bestseller");
const modelCate=require("./model/category");
//const forms=require("./model/formFuc");

//let express use handlebars engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//access of static files,css/img/mp4
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({extended:false}))


app.get("/", (req,res)=>{
   res.render("home",{
       title:"Home",
       bestData:modelBest.getBestPro(),
       categoryData:modelCate.getAllCate()
   });
});
app.get("/login", (req,res)=>{
    res.render("login",{
        title:"LOGIN",
        headingInfo:"LOGIN"
        
    });
});

app.post("/login", (req,res)=>{
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

app.post("/products", (req,res)=>{
    console.log(`${req.body.category}`);
    res.render("products",{
        title:"Our Products",
        category:req.body.category,
        data:model.getProducts(req.body.category),
        cateDate:modelCate.getAllCate()
    });


})
app.get("/signup", (req,res)=>{
    res.render("signup",{
        title:"SignUp"   
    });
});


app.post("/signup", (req,res)=>{
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

 app.post("/success", (req,res)=>{

    console.log(req.body.order);
    console.log(req.body.oName);
    res.render("success",{
        title:"SUCCESS",
        message:"You have ordered: "+req.body.oName   
    })
 });
 const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{

  console.log("running server");

})

