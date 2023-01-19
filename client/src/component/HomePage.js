import React,{useState} from "react";
import Commodity from "./Commodity";
import NavBar from "./NavBar";



const HomePage=()=>{
    const [searchText,setSearchText]=useState("");

    const changeSearchText=(text)=>{
        setSearchText(text);
    }; //練習props系統，如果搜尋的值傳進state，透過props傳給Commdity然後促使他rerender

    

    return(
        <div>
            <NavBar 
                changeSearchText={changeSearchText}
                // 從navbar裡的searchBar更新
                //只有在homepage時才有搜尋功能
                //要在各種頁面使用搜尋功能的方法-
                    //1.使用redux作中央state管理，不使用props系統
                    //2.改變route架構，讓navbar成為最上層，這樣就可以子樹都有事件
                //但因為這功能比較晚寫，又想練習props，所以不使用redux也不改架構
                />
            <Commodity searchText={searchText}/>
        </div>
    );
};

export default HomePage;
