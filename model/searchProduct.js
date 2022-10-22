

const searchProduct=async(ID)=>{
    const mongoose=require('mongoose');
    mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
    const connection=mongoose.connection;
    return new Promise((resolve,reject)=>{
        connection
        .on("error",error=>{
            console.log("your Error",error);
        });//打開資料庫
        
        connection.once('open',async ()=>{
            console.log("searchProduct connect");
            const collection=connection.db.collection("product");
            collection.find({"_id":mongoose.Types.ObjectId(ID)}).toArray(function(err,data){
                if(err){
                    console.log(err);
                    reject(err);
                }
                if(data){
                    connection.close();//關閉資料庫，否則下次連不到
                    resolve(data);
                }
            })
        });
        
    });
}


module.exports=searchProduct;

 