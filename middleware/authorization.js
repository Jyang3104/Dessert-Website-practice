const dashBoardLoader=(req,res)=>{

    if(req.session.userlogin.user=="a"){
        res.redirect("/clerk/dash");

    }else{
        res.render("userdashboard");
    }
}

module.exports=dashBoardLoader;