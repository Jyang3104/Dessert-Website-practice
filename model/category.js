const category={
    fakeDB:[],

    newDB(){
    this.fakeDB.push({
        category:"chocolate",
        id:"cho",
        pic:"boxCho.jpg"
    });
    this.fakeDB.push({
        category:"cake",
        id:"cak",
        pic:"bluCak.jpg"
    });
    this.fakeDB.push({
        category:"icecream",
        id:"ice",
        pic:"matIce.jpg"
    });
    this.fakeDB.push({
        category:"drink",
        id:"dri",
        pic:"mikTea.jpg"
    });
   },
    getAllCate(){
        return this.fakeDB;
    }
    
}

category.newDB();
module.exports=category;


