import React,{useEffect, useState} from "react";
import axios from 'axios';
import checkURL from '../module/urlDatabase';
import { useNavigate } from "react-router-dom";




const Commodity=(props)=>{
    const [productList,setProductLsit]=useState([]);//更新到state，方便渲染
    const navigate=useNavigate();
    
    const getProductdata=async()=>{
        let product=await axios.get('/api/product');
        return product.data //return product 陣列
    };

    function addEvent(dataID){
        return function (){
            navigate(`/product/${dataID}`);//導出該產品的頁面
        }
    }//回傳函式，讓回傳函式的記憶體位址能寫進事件
    
    
    const generateSearchedCommodity=(dataArr)=>{
        console.log(dataArr);

        let filterWord=new RegExp(`${props.searchText}`);

        //搜尋符合搜尋詞裡任一字

        console.log(filterWord);

        let searchCommodityJsx=dataArr.filter((data)=>{
           if(filterWord.test(data.name)||filterWord.test(data.type)){
                return data;
            }
        });
        //使用filter先抓出符合條件的產品

        setProductLsit(searchCommodityJsx.map((data,index)=>{
            //再將其轉成JSX，透過setState重新渲染
            const photo=checkURL(data._id);
         
            return(
            <div 
            className='commodityBlock'
            id={""+data._id}
            key={"product"+index}
            onClick={addEvent(data._id)}
            >
                <div className="commodityPhoto">
                    <img
                    width='100%'
                    height='100%'
                    src={photo} 
                    alt={data.name} 
                    />
                </div>
                <div className="commodityName">
                    {data.name}
                </div>
            </div>
            );
        }
        ));
 
                
    };


    const displayProduct=async()=>{
        let productData=await getProductdata();//先取得所有產品的資訊

        

        if(props.searchText==""){//沒有搜尋任何產品了話
            setProductLsit(productData.map((data,index)=>{
                const photo=checkURL(data._id);
                return(
                <div 
                className='commodityBlock'
                id={""+data._id}
                key={"product"+index}
                onClick={addEvent(data._id)}
                >
                    <div className="commodityPhoto">
                        <img
                        width='100%'
                        height='100%'
                        src={photo} 
                        alt={data.name} 
                        />
                    </div>
                    <div className="commodityName">
                        {data.name}
                    </div>
                </div>
                );
            })) ;
        }

        else{
            //如果有搜尋產品，根據搜尋的字串，以正規表達法方式在前端做搜尋
            //實際上，丟到後端給資料庫處理，可能當資料越來越多時，效能可能更好
            //不過這裡練習前端正規表達法，因此就不往後端丟

            generateSearchedCommodity(productData);
            //使用正規表達查詢

   
        }
    };
    
    
    
    useEffect(()=>{
        displayProduct();
    },[props.searchText]);
    //根據props.searchText做出變化

 




    return(
        <div>
            <div className="commodityContainer">
              {productList.length===0?<div style={{marginTop:'5vh'}}>目前沒有該商品喔</div>:productList}
            </div>
        </div>
    );
};

export default Commodity;