import React, {Fragment, useEffect,useRef} from "react";

const SearchBar=(props)=>{
        //只有在homepage時才有搜尋功能
        //要在各種頁面使用搜尋功能的方法-
            //1.使用redux作中央state管理，不使用props系統
            //2.改變route架構，讓navbar成為最上層，這樣就可以子樹都有事件
        //但因為這功能比較晚寫，又想練習props，所以不使用redux也不改架構
        

    const SearchInputRef=useRef(null);
    const SearchButtonRef=useRef(null);
   


    function searchEvent(e){
        
        
        if(e.keyCode===13){//要輸入enter才送出
            props.changeSearchText(e.target.value);
            // props.changeSearchText(e.target.value)才能將state往上傳;
        }
    }

    


    const cleanText=()=>{
        SearchInputRef.current.value="";
        //刪除字串
        props.changeSearchText(SearchInputRef.current.value);
        //更新state
    };

 
    


    useEffect(()=>{
        const SearchInput=SearchInputRef.current;
        //記得另外宣告新變數紀錄ref.current的記憶體位置，
        //因為每次rerender時ref.current記憶體位置會變，
        //這樣cleanup function在run時，無法讀取新的記憶體位置(已經被洗掉變成null)，
        //進而導致找不到原本的位置，出現null錯誤

        const SearchButton=SearchButtonRef.current;

        const clickEvent=()=>{//搜尋click事件
            props.changeSearchText(SearchInput.value);
        };


        SearchInput.addEventListener('keypress',searchEvent);
        SearchButton.addEventListener('click',clickEvent);
        
        
        return ()=>{
            SearchInput.removeEventListener('keypress',searchEvent);
            SearchButton.removeEventListener('click',clickEvent);
        };
    },[]);

    return (
        <Fragment>
            <input 
                type='text'
                placeholder="搜尋甚麼..."
                className="searchBarInput"
                ref={SearchInputRef}
                />
            <div className="searchBarCleaner" onClick={cleanText}>x</div>
            <div className="searchBarText" ref={SearchButtonRef}>搜尋</div>
        </Fragment>
    );
};

export default SearchBar;