import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

import axios from 'axios';
import { useEffect,useState } from "react";



const Signup=()=>{
    const [success,setSuccess]=useState(false);
    const BackToLogin=()=>{
        return(
            <div className="formPosition">
                <div 
                className="formStyle"
                style={
                    {
                        textAlign:"center",
                        lineHeight:'50vh'
                    }
                }>
                    註冊成功
                    <Link to='/login'>回登入畫面</Link>
                </div>
            </div>
        );
    };
    
    const pagedisplay=()=>{
        return(
            <div className="formPosition">
            <div className="formStyle">
                <div className="pFrame"><p>註冊會員</p></div>
                <div className="formInput">
                    <div>帳號:<br/>
                        <input
                        type="text"
                        name="account"
                        id="signupAccount"
                        />
                    </div>
                    <div>密碼:<br/>
                        <input
                        type="password"
                        name="password"
                        id="signupPassword"
                        />
                    </div>
                    <div>
                        <input
                            type="button"
                            value="註冊"
                            id="signupButton"
                            className="formButton"
                            />
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    已經有會員嗎?趕快來登入吧!<Link to='/login'>登入會員</Link>
                </div>
            </div>
        </div>
        );
    }

    const  signup=async()=>{
        let account=document.getElementById('signupAccount').value;
        let password=document.getElementById('signupPassword').value;

        if(account===''||password===''){//防呆機制，至少不能是空字串
            alert("請輸入,想要註冊的帳號密碼!");
        }
        else{
            let ans=await axios({
                method:'post',
                url:'/api/signup',
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data:{
                    account:account,
                    password:password
                }
            });


            if(ans.data=="0"){
                account="";
                password="";
                alert("該帳號已經被註冊過，請重新輸入");
            }


            else if(ans.data=="1"){
                setSuccess(true);
            }

            
        }

     
    };


    useEffect(()=>{
        let signupButton=document.getElementById('signupButton');
        signupButton.addEventListener('click',signup);
    },[]);


    
    return(
        <div>
            <NavBar />
            {success?BackToLogin():pagedisplay()/*根據success值來決定render哪個畫面*/}
            
        </div>
    );
};

export default Signup;

