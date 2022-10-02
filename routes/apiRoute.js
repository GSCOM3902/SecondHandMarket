const express=require("express");
const mongoose=require("mongoose");
const Account=require("../model/Account");


module.exports=(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //註冊api
    app.post('/api/signup',async (req,res)=>{
        let signupAccount=req.body.account;
        let signupPassword=req.body.password;
        
        const exist=await Account.where("account").equals(signupAccount);
        //先查詢是否有人註冊過同樣帳號


        if(exist.length===0){ //如果還沒被註冊，寫進資料庫
            let account=new Account({
                account:signupAccount,
                password:signupPassword
            });
            
            await account.save();
            
            res.send("1");
        }

        else{//被註冊了話
            res.send("0");
        }

        
    });

    //登入api
    app.post('/api/login',async (req,res)=>{
        let loginAccount=req.body.account;
        let loginPassword=req.body.password;

        const user=await Account.where("account").equals(loginAccount);
        
        if(user.length!==0){//如果有註冊了話
            res.send("1");
        }

        else{
            res.send("0");//沒註冊了話
        }

    });

};