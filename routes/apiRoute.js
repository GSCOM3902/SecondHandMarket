const express=require("express");
const mongoose=require("mongoose");
const Account=require("../model/Account");
const passport =require('passport');
const extractProduct=require('../model/product');
const searchProduct=require('../model/searchProduct');
const { MongoClient, ServerApiVersion } = require('mongodb');


module.exports=(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //註冊api
    app.post('/api/signup',async (req,res)=>{
        let signupAccount=req.body.account;
        let signupPassword=req.body.password;
        
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");


        const exist=await Account.where("account").equals(signupAccount);
        //先查詢是否有人註冊過同樣帳號

        
        if(exist.length===0){ //如果還沒被註冊，寫進資料庫
            let account=new Account({
                account:signupAccount,
                password:signupPassword,
            });
            
            await account.save();
            
            db.disconnect();//關閉資料庫
            res.send("1");
        }

        else{//被註冊了話

            db.disconnect();//關閉資料庫
            res.send("0");
        }

        
    });

    //登入api
    app.post('/api/login',async (req,res)=>{
        let loginAccount=req.body.account;
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        

        const user=await Account.where("account").equals(loginAccount);

       
        db.disconnect();//關閉資料庫

        console.log(user);

        if(user.length!==0){//如果有註冊了話

            

            res.send({
                id:user[0].id
            })
        }

        else{
            res.send("0");//沒註冊了話
        }

    });

    



    //google oauth api
    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }));
    
    app.get('/auth/google/callback',passport.authenticate('google'),function(req,res){
        res.redirect('/');
    });

    app.get('/api/getGoogleData',(req,res)=>{
        res.send(req.user);
    });

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send(req.user);
    });



    
    //product產生
    app.get('/api/product',async (req,res)=>{
        let ProductData=await extractProduct;
        res.send(ProductData);//回傳產品陣列
    });


    //Restful API 個別產品的CURD


    //Create
    app.post('/api/product/ID',async(req,res)=>{
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        const instance=await Account.findById(req.body.memberID);
        

        instance.shoppingCart.push(req.body.productID);

        await instance.save(); //save update

        await db.disconnect();//close mongodb

        res.send({state:true});//回傳ture,讓前端渲染畫面
    });
    

    //Read
    app.get('/api/product/ID',async(req,res)=>{
        const uri = "mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        const collection = client.db("test").collection("product");

        let ProductDetail=await searchProduct(collection,req.query.ID);//根據前端給的id參詢

        client.close();//closedb
        res.send(ProductDetail);
        });
    
    //Update
    app.put('/api/product/ID/:memberID',async(req,res)=>{
        console.log('update shoppingCart');
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        let memberID=req.params.memberID;
        let config=req.body.obj;
        const instance=await Account.findById(memberID);

        switch(config.action){//根據不同動作來決定行為
            case 'add':
                for(let i=1;i<=config.num;i++){
                    instance.shoppingCart.push(config.productID);
                }
                break;
            case 'minus':
                for(let i=1;i<=config.num;i++){
                    let index=instance.shoppingCart.indexOf(config.productID);
                    instance.shoppingCart.splice(index,1);
                }
                break;
        }

        await instance.save();//save update

        await db.disconnect();//close mongodb

        res.send(instance.shoppingCart);
        
    });

    
    //Delete
    app.delete('/api/product/ID/:memberID/:productID',async(req,res)=>{
        console.log('delete');
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        const {memberID,productID}=req.params;
        console.log(memberID+'\t'+productID);
        const instance=await Account.findById(memberID);

        instance.shoppingCart=instance.shoppingCart.filter(ID=>ID!==productID);

        await instance.save();//save update
        await db.disconnect();//close mongodb

        res.send(instance.shoppingCart);
    });
    




    //Account Search

    app.get('/api/accountSearch',async(req,res)=>{
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        const instance=await Account.findById(req.query.memberID);
        res.send({member:instance});

        await db.disconnect();
    });

};