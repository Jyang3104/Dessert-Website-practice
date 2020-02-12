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
    const errMessage=[];
  if(req.body.name==""){
 
        errMessage.push("Please enter Your Name.");
    }
  if(req.body.Email==""){
 
     errMessage.push("Please enter Your Email.");
  }
 
  if(req.body.pwd==""){
  errMessage.push("Please enter password.");}
 
  if(req.body.pwd!=req.body.pwd2){
      errMessage.push("Password Does Not Match.")
  }
  if(errMessage.length>0){
 
     res.render("signup",{
         title:"SignUp",
         error:errMessage
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

