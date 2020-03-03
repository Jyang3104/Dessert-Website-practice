const exp=require("express");
const app= exp();
const exphbs  = require('express-handlebars');
const bodyParser=require('body-parser');

//load environment variable file
require('dotenv').config({path:"./config/keys.env"});


//let express use handlebars engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//access of static files,css/img/mp4
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({extended:false}))

//load controller
const genController=require("./controllers/general");
const prodController=require("./controllers/products");
const signupController=require("./controllers/signup");


//map controller
app.use("/", genController);
app.use("/products", prodController);
app.use("/signup", signupController);

 const PORT=process.env.PORT;
 app.listen(PORT,()=>{

  console.log("running server");

})

