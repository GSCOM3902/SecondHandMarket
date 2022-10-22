import React,{useEffect, useState} from "react";
import axios from 'axios';
import checkURL from '../module/urlDatabase';
import { useNavigate } from "react-router-dom";




const Commodity=()=>{
    const [productList,setProductLsit]=useState([]);
    const navigate=useNavigate();
    const getProductdata=async()=>{
        let product=await axios.get('/api/product');
        return product.data //return product 陣列
    };

    const displayProduct=async()=>{
        let productData=await getProductdata();
        setProductLsit(productData.map((data,index)=>{
            const photo=checkURL(data._id);
            function addEvent(){
                navigate(`/product/${data._id}`);//導出該產品的頁面
            }
            return(
                <div 
                id={""+data._id}
                key={"product"+data.id}
                style={{marginTop:'5vh',
                        width:'100px',
                        height:'100px'}}
                onClick={addEvent}
                display='block'
                >
                    <div
                    display="block"
                    >
                        <img
                        width='100px'
                        height='100px'
                        src={photo} 
                        alt={data.name} 
                        />
                    </div>
                    <div style={{fontSize:'10px',
                            }}>
                        {data.name}
                    </div>
                </div>
            );
        })) ;
    };

  

    useEffect(()=>{
        displayProduct();
    },[]);





    return(
        <div>
            <div>
              {productList.length===0?<div style={{marginTop:'5vh'}}>loading..</div>:productList}
            </div>
        </div>
    );
};

export default Commodity;