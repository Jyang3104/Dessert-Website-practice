const isLogin = (req,res,next)=>{
    if(req.session.userlogin){
        next();
    }else{
        res.render("login",{
            title:"LOGIN",
            message:"PLEASE LOGGIN FIRST"    
        });
    }

}
module.exports = isLogin;