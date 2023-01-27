import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector,useDispatch} from "react-redux";
import { showMemberShoppingCart } from "../action";
import NavBar from "./NavBar";
import checkURL from "../module/urlDatabase";
import ShoppingCartComponent from "./ShoppingCartComponent";


const ShoppingCartPage=()=>{
    const {memberID}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const memberShoppingCart=useSelector(state=>state.memberShoppingCart);
    const [fetchSate,setFetchSate]=useState([]);//使用useState做單頁面的渲染
    const [sum,setSum]=useState(0);//購物車的總金額使用state做單頁面的紀錄
    const [focusID,setFocusID]=useState("");//修改期間的排他性
    const [focusCountObj,setFoucsCountObj]=useState({});//修改期間的數量物件

    


    function boxChange(e){
        if(e.target.checked){//如果checkbox是勾選的
            setSum(prev=>prev+parseInt(e.target.value));//將金額加入總金額
            
        }
        else{//如果checkbox不是是勾選的
            setSum(prev=>prev-parseInt(e.target.value));//扣掉金額
        }

         /*
         為甚麼是使用function回傳,因為setState封包關系,
         如果不是在useEffect裡宣告函式，通常不會重新宣告，
         因此封包裡的state值並不會rerender,此時就需要使用previous State
         */

    };


    const childSetFocusID=(ID)=>{
        setFocusID(ID);
    };

    const childSetFocusCountObj=(obj)=>{
        setFoucsCountObj(obj);
        //會在底層做複製再傳入
    };


    const modifyAPI=async()=>{

        if(Object.keys(focusCountObj).length!==0){//要有變更才call API
            let res=await axios.put(`/api/product/ID/${memberID}`,{obj:focusCountObj});
            dispatch(showMemberShoppingCart(res.data));
        }

        setFoucsCountObj({});//每次從修訂模式出來，都要初始化
    };


    const deleteProduct=async(productID)=>{
        let res=await axios.delete(`/api/product/ID/${memberID}/${productID}`);
        dispatch(showMemberShoppingCart(res.data));
    }

    const createItemList=async()=>{
        
        let list=[];//數量跟產品ID
        if(memberShoppingCart.length!==0){//確保有東西才執行
            for(let i=0;i<memberShoppingCart.length;i++){
                let num=1;
                if(list.find(ele=>ele.productID===memberShoppingCart[i])){
                    //如果再list陣列已經有紀錄，就往下個迴圈跑
                    continue;
                }
                else{//如果沒有紀錄
                for(let j=i+1;j<memberShoppingCart.length;j++){
                        if(memberShoppingCart[j]===memberShoppingCart[i]){
                            num++;//次數+1
                        }
                    }
                }
                list.push({
                    productID:memberShoppingCart[i],
                    num:num//幾個產品
                });//最後將沒紀錄的產品寫進陣列;
            }
            
         

            const product=await Promise.all(list.map(async item=>{
                //使用promise all 來確保每個資料都有讀取
                const detail=await axios.get('/api/product/ID',{
                    params:{ID:item.productID}
                });
                return detail;
            }));


            if(product){ //再次確認接收到product
                const itemList=product.map(item=>{
                    const itemDetail=item.data[0];
                    let productnum=list.find(ele=>ele.productID===itemDetail._id).num;
                    //找出對應id的數量
                    const photo=checkURL(itemDetail._id);//記得react的img src比較複雜
                    return(
                        <div className="shoppingItemFrame" key={'frame_'+itemDetail._id}>
                            <input 
                                type='checkbox'
                                id={'itemList_'+itemDetail._id}
                                name={itemDetail.name}
                                value={itemDetail.price*productnum}
                                onChange={boxChange}
                                // 把資料跟產品id留在checkbox，方便event操作
                            />
                            <img
                                className="ItemListImg"
                                src={photo}
                                alt={itemDetail.name}
                                onClick={()=>{navigate(`/product/${itemDetail._id}`)}}
                                // 點擊圖片前往商品頁
                            >
                            </img>
                            < ShoppingCartComponent
                                name={itemDetail.name}
                                price={itemDetail.price}
                                num={productnum }
                                productID={itemDetail._id}
                                focusID={focusID}
                                setFoucsID={childSetFocusID}
                                focusCountObj={focusCountObj}
                                setFoucsCountObj={childSetFocusCountObj}
                            />
                            <div className="shoppingCartSideBox">
                                <div 
                                    className="shoppingCartDelete"
                                    onClick={async()=>{
                                        await deleteProduct(itemDetail._id);
                                     }}
                                >
                                    <div className="deleteImg"></div>
                                </div>
                                <div 
                                    className="shoppingCartModify"
                                    onClick={()=>{
                                        focusID===itemDetail._id? setFocusID(""):setFocusID(itemDetail._id);
                                        // 更改focusID，並傳到ShoppingCartComponent，根據是否指定項目決定動作
                                    }}
                                >
                                    <div className={focusID===itemDetail._id?'correctImg':'modifyImg'}></div>
                                </div>
                            </div>
                        </div>
                    )
                });
                setFetchSate(itemList);
                // await axios.get('/api/closeDB').then(ans=>{console.log(ans.data)});  
                //一次關掉資料庫 
            }

        }
    };

    

    
    useEffect(()=>{//只要購物車有更動，就要更新,或是修訂成功就更新;
            createItemList();
    },[memberShoppingCart,focusID]);


    useEffect(()=>{
        if(focusID===""){
            modifyAPI();//修訂完成後執行
        }
    },[focusID]);




    return(//一開始渲染
        <div>
            <NavBar />
            <div className="shoppingPageFrame">
                <div className="shoppingPageTitle">
                    <div>{memberID}，你好!</div>
                    <div className="shoppingPageMessage">您的購物車有
                        <h2 className="shoppingPageCount">{memberShoppingCart.length}</h2>
                        項商品!
                    </div>
                </div>
                {memberShoppingCart.length!==0?fetchSate:'目前還沒商品喔!'/*根據購物車是否有商品來產生畫面*/}
            </div>
        
            <div className="checkoutFrame">
                <div className="sumclass"><div>購買總金額:{sum}</div></div>
                <div className="checkoutButton"><div>結帳</div></div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;