import React,{useEffect,useState} from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import checkURL from '../module/urlDatabase';
import { useSelector,useDispatch } from "react-redux";
import { addItemToShoppingCart } from "../action";
import Comment from "./Comment";



const Product=()=>{
    const {productID}=useParams();
    const [ProductDetail,setProductDetail]=useState(null);//產生資料重新刷新
    const [updateComment,setUpdateComment]=useState(0);//用來控制留言後重新渲染頁面
    const memberID=useSelector(state=>state.memberID);
    const navigate=useNavigate();
    const dispatch=useDispatch();



    const search=async()=>{
        let productDetail=await axios.get('/api/product/ID',{
            params:{ID:productID}
        });//接API取得該產品資料
        setProductDetail(productDetail.data[0]);//傳進state才能rerender
        //關掉資料庫
    };


    const childSetUpdateComment=()=>{
        setUpdateComment(prev=>prev+1);
    }
    


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
                    <div className="productComment">留言</div>
                    <Comment
                        productID={productID}
                        childSetUpdateComment={childSetUpdateComment}
                        productComment={ProductDetail.comments}
                    />
                </div>
                <div className="productShoppingCart" id="shoppingCartButton">
                    加入購物車
                </div>
            </>
        );        
    };



    useEffect(()=>{
        search(); 
    },[updateComment]);//有更新留言就重新抓一次資料

    useEffect(()=>{
        if(ProductDetail!==null&&memberID===""){
            //以免發生抓到NULL物件,沒登入不能加入購物車
            let button=document.getElementById('shoppingCartButton');
            button.addEventListener('click',async()=>{
                alert("請先登入會員");
                navigate('/login');
                //指引去登入區
            });
        }
        else if(ProductDetail!==null&&memberID!==""){//已經登入
            let button=document.getElementById('shoppingCartButton');
            button.addEventListener('click',async()=>{
                const state=await axios.post('/api/product/ID',{
                    memberID:memberID,
                    productID:ProductDetail._id
                });

                if(state){
                    dispatch(addItemToShoppingCart(ProductDetail._id));
                    //傳入redux讓shoppingCart更新
                    alert("已經加入購物車!");
                    navigate(`/shoppingCartPage/${memberID}`);
                }
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