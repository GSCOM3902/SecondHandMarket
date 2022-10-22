import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { memberlogin,memberlogout } from "../action";
import axios from "axios";

const MemberCenter=()=>{
    const dispatch=useDispatch();
   

    const session_memberID=sessionStorage.getItem("session_memberID");
    //存進session以防refresh時，state跑掉
    
    const memberID=useSelector(state=>state.memberID);//state


    const logout= async()=>{
        sessionStorage.removeItem("session_memberID");
        dispatch(memberlogout());
        //刪除session跟state
        const res=await axios.get('/api/logout');
        //登出gooleAuth,googleAuth有設cookieSession，要手動登出
        if(res){
            window.location.reload();
            //重新刷新頁面
        }

    }


    const getGoogleData=async()=>{
        const GoogleDate=await axios.get('/api/getGoogleData');
        if(GoogleDate.data!==""){    //如果是googleauth登入
            sessionStorage.setItem("session_memberID",GoogleDate.data._id);
            dispatch(memberlogin(session_memberID));
            //寫進session裡，並且更新state
        }
    };

    useEffect(()=>{
        if(session_memberID!==null){//如果一開始就有session代表是用網頁登入
            dispatch(memberlogin(session_memberID));//更新到state
        }
        else{
            getGoogleData();//一開始沒有session代表是googleAuth登入
        }
    },[]);
    //如果session有值，分配state

    useEffect(()=>{
        if(memberID!==""){//要memberID有，才執行loggout
            let loggoutbutton=document.getElementById("memberLogoutButton");
            loggoutbutton.addEventListener('click',logout);
        }
    },[memberID]);

    const memberNotLogin=()=>{
        return(
        <Link to="/login" > {/*導去登入畫面 */}
            member center
        </Link>
        );
    }

    const memberHasLogin=()=>{
        return(
                <div className="memberLogout" id="memberLogoutButton">loggout?</div>
        );
    }

    return(
       <>
         {memberID===""?memberNotLogin():memberHasLogin()}
       </>
    );   
};

export default MemberCenter;