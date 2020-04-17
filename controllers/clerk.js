const express=require('express');
const router=express.Router();
const path=require("path");
const isAuth=require("../middleware/auth");

//import local module
const proModel=require("../model/product");


router.get("/add",isAuth,(req,res)=>{
    res.render("clerk/clerkAdd");
});

router.post("/add",isAuth,(req,res)=>{

    const errMessage={};
    let validFlag=true;
    console.log(req.files.pic.mimetype);
    if((req.files.pic.mimetype!="image/png")&&(req.files.pic.mimetype!="image/gif")&&(req.files.pic.mimetype!="image/jpg")&&(req.files.pic.mimetype!="image/jpeg")){
        validFlag=false;
        errMessage.pic="Only .jpg/.png/.gif is accepted";
    }
    if(validFlag){

        const newItem={
        title:req.body.title,
        id:req.body.id,
        cate:req.body.cate,
        unit:req.body.unit,
        best:req.body.best,
        price:req.body.price,
        qty:req.body.qty,
        ingredient:req.body.ingredient
    }

    const item=new proModel(newItem);
    item.save()
    .then((item)=>{
        console.log(req.files.pic.name);
        req.files.pic.name=`${item.id}${path.parse(req.files.pic.name).ext}`;
        req.files.pic.mv(`public/img/${req.files.pic.name}`)
        .then(()=>{

            proModel.updateOne({_id:item._id},{pic:req.files.pic.name})
            .then(()=>{
                res.redirect("/clerk/dash");
            })
            .catch(err=>console.log(`ERR SAVE IMG PATH: ${err}`))



            
        })
        .catch(err=>console.log(`ERR FILE: ${err}`))
        
    })
    .catch(err=>console.log(`ERR CLK ADD: ${err}`));
    }else{
        res.render("clerk/clerkAdd",{
            error:errMessage
        })
    }

    
   
});

router.get("/dash", isAuth,(req,res)=>{
   
    proModel.find()
    .then(prods=>{
        const filterprods= prods.map(prod=>{
            return {
                id:prod._id,
                title:prod.title,
                cate:prod.cate,
                best:prod.best,
                price:prod.price,
                qty:prod.qty
            }
        });
        
        res.render("clerk/clerkDashboard",{
            data:filterprods
        });
    })
    .catch(err=>console.log(`ERR CLK PRODUCTS: ${err}`))
});


router.get("/edit/:id",isAuth,(req,res)=>{

    proModel.findById(req.params.id)
    .then((pro)=>{
        const {_id,title,cate,unit,best,price,qty,ingredient}=pro;
        res.render("clerk/clerkEdit",{
            _id,
            title,
            cate,
            unit,
            best,
            price,
            qty,
            ingredient
        });
    })
    .catch(err=>console.log(`ERR FINDBYID: ${err}`))
    
});

router.put("/edit/:id",(req,res)=>{
    const item={
        title:req.body.title,
        cate:req.body.cate,
        unit:req.body.unit,
        best:req.body.best,
        price:req.body.price,
        qty:req.body.qty,
        ingredient:req.body.ingredient
    }
    proModel.updateOne({_id:req.params.id},item)
    .then(()=>{
        res.redirect("/clerk/dash");
    })
    .catch(err=>console.log(`ERR UPDATE ITEM: ${err}`))
});
module.exports=router;