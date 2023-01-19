import React,{useEffect} from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {showMemberShoppingCart} from '../action/index';
import { useNavigate } from "react-router-dom";

const ShoppingCart=()=>{
    const memberShoppingcart=useSelector(state=>state.memberShoppingCart);
    const memberID=useSelector(state=>state.memberID);
    const navigate=useNavigate();
    

    const dispatch=useDispatch();
    const showShoppingCart=async()=>{
        if(memberID!==""&&memberShoppingcart.length===0){ //已經登入但還沒沒載入購物車
            const memberData=await axios.get('/api/accountSearch',{
                params:{memberID:memberID}
            }); //取得會員資料
            
            if(memberData.data.member.shoppingCart.length!==0){
                //如果有資料庫的資料，傳進redux管理
                dispatch(showMemberShoppingCart(memberData.data.member.shoppingCart));
                //一次把陣列全dispatch,reducer直接給一個新記憶體回傳
            }
       
        }
    };



    const showNumOfItems=()=>{
        if(memberShoppingcart.length!==0){//有更新redux
            return(
                <div className="shoppingCartItemsNum">
                    {memberShoppingcart.length} 
                    {/* 根據陣列長度變更 */}
                </div>
            );
        }
        else{
            return null;
        }
    };

    const turnToShoppingCartPage=()=>{
        if(memberID===""){//如果還沒登入
            alert("請先登入");
            navigate('/login');
        }
        else{//已經登入了話
            navigate(`/shoppingCartPage/${memberID}`)
        }
    };

    useEffect(()=>{
        showShoppingCart();
    },[memberID,memberShoppingcart]);
    // //根據有沒有登入或購物車狀態刷新

    return(
        <div id="shoppingCartFrame" onClick={turnToShoppingCartPage}>
            <div className="shoppingCartWidget">
                {showNumOfItems()}
            </div>
        </div>
    )
};

export default ShoppingCart;