
const extractProduct=new Promise((resolve,reject)=>{//寫進promise控制流程
    const mongoose=require("mongoose");
    mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
    const connection=mongoose.connection;
    connection
    .on("error",error=>{
        console.log("your Error",error);
    });

    connection.once('open',async ()=>{
        console.log('product Connect');
        const collection=connection.db.collection("product");
        
        //讓ProductData等於data
        collection.find({}).toArray(function (err,data){//轉為陣列
            if(err){
                console.log(err);
                reject(err);
            }
            if(data){
                connection.close();//關閉資料庫，否則下次連不到
                resolve(data);//成攻讀取資料resolve他
            }
        });
    });
});

module.exports=extractProduct;//模組封包









