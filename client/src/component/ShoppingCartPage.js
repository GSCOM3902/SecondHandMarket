import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const ShoppingCartPage=()=>{
    let {memberID}=useParams();

    let getMemberData=async()=>{
        const memberData=await axios.get('/api/accountSearch',{
            params:{memberID:memberID}
        });
        
        console.log(memberData.data);
    };

    useEffect(()=>{
        getMemberData();
    },[])
    return(
        <div>
           {memberID}
        </div>
    );
};

export default ShoppingCartPage;