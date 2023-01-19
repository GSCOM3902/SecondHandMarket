const express=require("express");
const app=express();
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');
require('./model/Account');
require('./services/passport');

require('events').EventEmitter.defaultMaxListeners = 100;


const PORT=process.env.PORT||5000;
const DURL="mongodb+srv://onlineAccount:1234@btd.ghghjai.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DURL).then(  //連接mongoDB
    console.log("MongoDB connected!")
).catch(err=>{console.log(err)});

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
    );//passport需要session
    
app.use(passport.initialize());
app.use(passport.session());
    
  

const route=require('./routes/apiRoute');

route(app);

if(process.env.NODE_ENV==='production'){


    app.use(express.static('client/build'));
    //如果是前端要傳去第三方api，express認不得，就會執行bundle檔

    const path=require("path");
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
    //如果route，express根本認不得，會直接產生html，通常是接收react路徑

}

app.listen(PORT);