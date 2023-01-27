const mongoose=require('mongoose');


const addComment=(collection,productID,comment)=>{
    return new Promise((resolve,reject)=>{
        collection.findOneAndUpdate({"_id":mongoose.Types.ObjectId(productID)},{$push:{"comments":comment}}).then(()=>{
            resolve();
        });
    })
};

module.exports=addComment;