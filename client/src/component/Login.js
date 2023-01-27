import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from 'axios';



const Login=()=>{
    const navigate=useNavigate();



    const login=async ()=>{

        let account=document.getElementById('loginAccount').value;
        let password=document.getElementById('loginPassword').value;
        
     
        axios.post("/api/login",{
            account:account,
            password:password

        }).then((res)=>{
            if(res.data=="0"){
                alert("沒有找到該帳號喔!請先註冊會員!");
                navigate('/signup');
            }
            else if(res.data=='2'){
                alert("密碼錯誤請在輸入一次!");
            }
            else{
                sessionStorage.setItem("session_memberID",res.data.id);
                navigate('/');//登入成功，回首頁
            }
        });
    };
    
 
    
    useEffect(()=>{
        let loginButton=document.getElementById('loginButton');
        loginButton.addEventListener('click',login);
    },[]);

    return(
    <div>
        <NavBar />
        <div className="formPosition">
            <div  className="formStyle">
                <div className="pFrame"><p>登入會員</p></div>
                <div className="formInput">
                    <div>帳號:
                        <input
                        type="text"
                        name="account"
                        id="loginAccount"
                        />
                    </div>
                    <div>密碼:
                        <input
                        type="password"
                        name="password"
                        id="loginPassword"
                        />
                    </div>
                    <div>
                        <input
                        type="button"
                        id="loginButton"
                        className="formButton"
                        value="登入"
                        />
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    還沒有會員嗎?趕快來註冊吧!<Link to='/signup'>註冊會員</Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;