const mongoose=require('mongoose');




const searchProduct=async(collection,ID)=>{

    return new Promise((resolve)=>{
        
        let data=collection.find({"_id":mongoose.Types.ObjectId(ID)}).toArray();

        resolve(data);
    });
}
module.exports=searchProduct;

 