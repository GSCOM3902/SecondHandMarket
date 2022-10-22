import React,{useEffect,useState} from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import checkURL from '../module/urlDatabase';
import { useSelector,useDispatch } from "react-redux";


const Product=()=>{
    const {productID}=useParams();
    const [ProductDetail,setProductDetail]=useState(null);
    const memberID=useSelector(state=>state.memberID);
    const navigate=useNavigate();
    const search=async()=>{
        let productDetail=await axios.get('/api/product/ID',{
            params:{ID:productID}
        });//接API取得該產品資料
        setProductDetail(productDetail.data[0]);//傳進state才能rerender
    };


    


    const prodcutInterface=()=>{
        const photo=checkURL(ProductDetail._id);
        return(
            <>
                <div className="productCube">
                    <div className="productFrame">
                        <img src={photo} className="productImage"/>
                    </div>
                    <div className="productTitle">
                        <div className="productName">
                            {ProductDetail.name}
                        </div>
                        <div className="productPrice">
                            {ProductDetail.price}
                        </div>
                    </div>
                    <div className="productDetail">
                        <div>
                        {ProductDetail.detail}
                        </div>
                    </div>
                    <div className="productComment">
                        留言
                    </div>
                </div>
                <div className="productShoppingCar" id="shoppingCarButton">
                    加入購物車
                </div>
            </>
        );        
    };



    useEffect(()=>{
        search(); 
    },[]);

    useEffect(()=>{
        if(ProductDetail!==null&&memberID===""){
            //以免發生抓到NULL物件,沒登入不能加入購物車
            let button=document.getElementById('shoppingCarButton');
            button.addEventListener('click',async()=>{
                alert("請先登入會員");
                navigate('/login');
                //指引去登入區
            });
        }
        else if(ProductDetail!==null&&memberID!==""){
            let button=document.getElementById('shoppingCarButton');
            button.addEventListener('click',()=>{
                axios.post('/api/sendToShoppingCar',{
                    memberID:memberID,
                    productID:ProductDetail._id
                });
            });
        }
    },[ProductDetail]);


    return(
        <div>
            <NavBar />
            {ProductDetail===null?<div style={{marginTop:'5vh'}}>loading..</div>:prodcutInterface()}
        </div>
    )
};

export default Product;