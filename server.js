const exp=require("express");
const app= exp();
const exphbs  = require('express-handlebars');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

//load environment variable file
require('dotenv').config({path:"./config/keys.env"});


//let express use handlebars engine
app.engine('handlebars', exphbs(
  {
    helpers:{
      if_eq: function(a,b){
         if(a==b){
           return "selected"
         };
      },
      if_eq2: function(a){
        if(a){
          return "checked"
        };
     },
     if_neq: function(a){
      if(!a){
        return "checked"
      };
   }
    }
  }
));
app.set('view engine', 'handlebars');



//access of static files,css/img/mp4
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({extended:false}))


//load controller
const genController=require("./controllers/general");
const prodController=require("./controllers/products");
const signupController=require("./controllers/signup");
const clerkController=require("./controllers/clerk");

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to mongoDB`);
})
.catch(err=>console.log(`ERROR: ${err}`));

//middle ware to allow POST=>PUT/DELETE
app.use((req,res,next)=>{
    if(req.query.method=="PUT"){
      req.method="PUT"
    }else if(req.query.method=="DELETE"){
      req.method="DELETE"
    }
    next();
})

//middleware to upload file
app.use(fileUpload());

//map controller
app.use("/", genController);
app.use("/products", prodController);
app.use("/signup", signupController);
app.use("/clerk", clerkController);

 const PORT=process.env.PORT;
 app.listen(PORT,()=>{

  console.log("running server");

})

