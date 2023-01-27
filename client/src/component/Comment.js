import React,{useRef,useState,useEffect} from "react";
import axios from "axios";

const Comment=(props)=>{
    const inputObj=useRef(0);
    const [stringNum,setStringNum]=useState(0);

    

    let commentBox;//宣告初值

    if(props.productComment){//沒留言會是undefine       
        commentBox=props.productComment.map(ele=>{//根據留言陣列產生JSX
            return(
            <div className="commentTextbox" key={props.productComment+Math.random()*1000}>
                {ele}
            </div>
        )
    });
}

    const changeString=(e)=>{
        setStringNum(e.target.value.length);
    };

    async function deliveryEvent(e){
        if(e.keyCode===13){//要輸入enter才送出
            let res=await axios.post('/api/product/addComment',{
                productID:props.productID,
                newComment:e.target.value
            });
                
            if(res){
                e.target.value="";
                setStringNum(0);
                props.childSetUpdateComment();
            }
        }
    }


    async function buttonDeliveryEvent(){
        let res=await axios.post('/api/product/addComment',{
            productID:props.productID,
            newComment:inputObj.current.value
        });

      if(res){
        inputObj.current.value="";
        setStringNum(0);
        props.childSetUpdateComment();
      }
        
        
    }

    useEffect(()=>{
        const Input=inputObj.current;

        Input.addEventListener('keypress',deliveryEvent);

        return ()=>{
            Input.removeEventListener('keypress',deliveryEvent);
        }
    },[]);

    return(
        <>
        <div>
            <input
                ref={inputObj}
                className="commentInput"      
                type="text"
                placeholder="輸入你的想法吧!"
                maxLength='50'
                onChange={changeString} 
                />
            <div className="commentFlexBox"><div>{stringNum}/50</div><div className="addCommentButton" onClick={buttonDeliveryEvent}>送出留言</div></div>
        </div>
        <div>
           大家的留言:{commentBox}
        </div>
        </>
    )
}

export default Comment;