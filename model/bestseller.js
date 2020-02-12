const product={
    fakeDB:[],

    newDB(){
    this.fakeDB.push({
        title:"Chocolate Bar",
        id:"barCho",
        pic:"barCho.jpg",
        cate:"chocolate",
        unit:"100g",
        best:1,
        price:5.99
       
    });
    this.fakeDB.push({  
        title:"Chocolate Beans",
        id:"beaCho",
        pic:"beaCho.jpg",
        cate:"chocolate",
        unit:"100g",
        best:0,
        price:3.99
    });
    this.fakeDB.push({  
        title:"Blueberry Cake",
        id:"bluCak",
        pic:"bluCak.jpg",
        cate:"cake",
        unit:"8 inch",
        best:1,
        price:24.99
    });
    this.fakeDB.push({  
        title:"Chocolate Box",
        id:"boxCho",
        pic:"boxCho.jpg",
        cate:"chocolate",
        unit:"400g",
        best:0,
        price:17.99
    });
    this.fakeDB.push({  
        title:"Cheese Cake",
        id:"cheCak",
        pic:"cheCak.jpg",
        cate:"cake",
        unit:"8 inch",
        best:1,
        price:26.99
    });
    this.fakeDB.push({  
        title:"Chocolate Cake",
        id:"choCak",
        pic:"choCak.jpg",
        cate:"cake",
        unit:"8 inch",
        best:0,
        price:25.99
    });
    this.fakeDB.push({  
        title:"Chocolate Ice Cream",
        id:"choIce",
        pic:"choIce.jpg",
        cate:"icecream",
        unit:"scoop",
        best:1,
        price:4.99
    });
    this.fakeDB.push({  
        title:"Latte",
        id:"coffee",
        pic:"coffee.jpg",
        cate:"drink",
        unit:"cup",
        best:0,
        price:3.99
    });
    this.fakeDB.push({  
        title:"Fruit Tart",
        id:"fruTar",
        pic:"fruTar.jpg",
        cate:"cake",
        unit:"8 inch",
        best:1,
        price:27.99
    });
    this.fakeDB.push({  
        title:"Herbal Tea",
        id:"herTea",
        pic:"herTea.jpg",
        cate:"drink",
        unit:"cup",
        best:0,
        price:4.99
    });
    this.fakeDB.push({  
        title:"Hot Chocolate",
        id:"hotCho",
        pic:"hotCho.jpg",
        cate:"drink",
        unit:"cup",
        best:1,
        price:3.99
    });
    this.fakeDB.push({  
        title:"Ice Lemon Tea",
        id:"iceTea",
        pic:"iceTea.jpg",
        cate:"drink",
        unit:"cup",
        best:0,
        price:3.99
    });
    this.fakeDB.push({  
        title:"Maple Ice Cream",
        id:"mapIce",
        pic:"mapIce.jpg",
        cate:"icecream",
        unit:"scoop",
        best:1,
        price:4.99
    });
    this.fakeDB.push({  
        title:"Matcha Ice Cream",
        id:"matIce",
        pic:"matIce.jpg",
        cate:"icecream",
        unit:"bowl",
        best:0,
        price:6.99
    });
    this.fakeDB.push({  
        title:"Matcha Latte",
        id:"matLat",
        pic:"matLat.jpg",
        cate:"drink",
        unit:"cup",
        best:1,
        price:4.99
    });
    this.fakeDB.push({  
        title:"Milk Ice Cream",
        id:"mikIce",
        pic:"mikIce.jpg",
        cate:"icecream",
        unit:"bowl",
        best:0,
        price:5.99
    });
    this.fakeDB.push({  
        title:"Milk Tea",
        id:"mikTea",
        pic:"mikTea.jpg",
        cate:"drink",
        unit:"cup",
        best:1,
        price:3.99
    });
    this.fakeDB.push({  
        title:"Mint Ice Cream",
        id:"minIce",
        pic:"minIce.jpg",
        cate:"icecream",
        unit:"bowl",
        best:0,
        price:7.99
    });
    this.fakeDB.push({  
        title:"Mulberry Cake",
        id:"mulCak",
        pic:"mulCak.jpg",
        cate:"cake",
        unit:"8 inch",
        best:1,
        price:26.99
    });
    this.fakeDB.push({  
        title:"Red Velvet Cake",
        id:"redCak",
        pic:"redCak.jpg",
        cate:"cake",
        unit:"8 inch",
        best:0,
        price:23.99
    });
    this.fakeDB.push({  
        title:"Chocolate Truffles",
        id:"truCho",
        pic:"truCho.jpg",
        cate:"chocolate",
        unit:"100g",
        best:1,
        price:9.99
    });
    this.fakeDB.push({  
        title:"Chopped Unsweeten Chocolate",
        id:"uswCho",
        pic:"uswCho.jpg",
        cate:"chocolate",
        unit:"100g",
        best:0,
        price:6.99
    });
    this.fakeDB.push({  
        title:"French Vanila Ice Cream",
        id:"vanIce",
        pic:"vanIce.jpg",
        cate:"icecream",
        unit:"scoop",
        best:1,
        price:3.99
    });
    this.fakeDB.push({  
        title:"White Chocolate Bar",
        id:"whiCho",
        pic:"whiCho.jpg",
        cate:"chocolate",
        unit:"100g",
        best:0,
        price:4.99
    });
    
    },
getProducts(cate="all"){
let returnP=[];
if(cate=="all"){
    returnP=this.fakeDB;
}else{
  returnP=this.fakeDB.filter(element=>element.cate==cate);
}
return returnP;
},

getBestPro(){
    let returnP=[];
    returnP=this.fakeDB.filter(element=>element.best==1);
    return returnP;
}

}

product.newDB();
module.exports=product;



