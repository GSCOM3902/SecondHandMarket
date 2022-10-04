const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys');
const Account = require('../model/Account');

passport.serializeUser((account,done)=>{
    done(null,account.id);
});

passport.deserializeUser((id,done)=>{
    Account.findById(id).then(account=>{
        done(null,account);
    })
});

passport.use(
    new GoogleStrategy(
        {
            clientID:keys.clientID,
            clientSecret:keys.clientSecret,
            callbackURL:'/auth/google/callback',
            proxy:true
        },//使用api所需的資料
        async (accessToken,refreshToken,profile,done)=>{
            //google接收所需資料後，正確可以使用callback funtion
            Account.findOne({account:profile.id}).then((existingUser)=>{
                //確認資料庫有沒有profile.id
                if(existingUser){
                    done(null,existingUser);
                    //告訴google api，我完成這階段，傳回existUser
                }
                else{
                    new Account({
                        account:profile.id,
                        password:profile.emails[0].value
                    }).save().then(account=>done(null,account));//寫進資料庫
                }
            });

   
        }
    ));