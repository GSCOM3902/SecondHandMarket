const {createProxyMiddleware} =require('http-proxy-middleware');

module.exports=function(app){
    if(process.env.NODE_ENV==='production'){
        app.use(
            ["/api","/auth/google"],
            createProxyMiddleware({
                target: "https://calm-cliffs-70679.herokuapp.com",
            })
            );    
    }

    else{
        app.use(['/api',"/auth/google"],createProxyMiddleware({
            target:'http://localhost:5000'
        }));
    }

}