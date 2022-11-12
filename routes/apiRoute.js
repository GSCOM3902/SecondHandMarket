const express=require("express");
const mongoose=require("mongoose");
const Account=require("../model/Account");
const passport =require('passport');
const extractProduct=require('../model/product');
const searchProduct=require('../model/searchProduct');



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
    })


    
    //product產生
    app.get('/api/product',async (req,res)=>{
        let ProductData=await extractProduct;
        res.send(ProductData);//回傳產品陣列
    });

    app.get('/api/product/ID',async(req,res)=>{
        let ProductDetail=await searchProduct(req.query.ID);//根據前端給的id參詢
        console.log(ProductDetail);
        res.send(ProductDetail);
        });


    //shoppingcart
    app.post('/api/sendToShoppingCart',async(req,res)=>{
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        const instance=await Account.findById(req.body.memberID);
        console.log(instance);//it find it

        instance.shoppingCart.push(req.body.productID);

        await instance.save(); //save update

        await db.disconnect();//clsoe mongodb

        res.send({state:true});//回傳ture,讓前端渲染畫面
    });

    //Account Search

    app.get('/api/accountSearch',async(req,res)=>{
        const db=await mongoose.connect("mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority");
        const instance=await Account.findById(req.query.memberID);
        res.send({member:instance});

        await db.disconnect();
    });

};