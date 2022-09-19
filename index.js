const express=require("express");
const app=express();

const PORT=process.env.PORT||5000;

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