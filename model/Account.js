const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AccountSchema=new Schema({
    account:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    shoppingCart:{
      type:[String]  
    },
    strick:false
    

});

const Account=mongoose.model('Account',AccountSchema);

module.exports=Account;
