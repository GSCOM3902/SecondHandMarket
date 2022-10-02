const {createProxyMiddleware} =require('http-proxy-middleware');

module.exports=function(app){
    if(process.env.NODE_ENV==='production'){
        app.use(
            ["/api"],
            createProxyMiddleware({
                target: "https://calm-cliffs-70679.herokuapp.com",
            })
            );    
    }

    else{
        app.use(['/api'],createProxyMiddleware({
            target:'http://localhost:5000'
        }));
    }

}