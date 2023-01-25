import React,{useState,useEffect} from "react";


const ShoppingCartComponent=(props)=>{
    
    const [className,setClassName]=useState("componentFrame");
    const [currentNum,setCurrentNum]=useState(props.num);

    


    


    //滑動函式庫
    let startX,currentX,moveX;

    const touchStartEvent=(e)=>{
        startX=e.touches[0].pageX;//儲存初始位置
    };

    const touchMoveEvent=(e)=>{
        currentX=e.touches[0].pageX;//儲存現在位置

        moveX=Math.floor(startX-currentX);//取得總移動量,取整數



        if(e.currentTarget.className==="componentFrame"){ //如果是還沒滑，只能左滑，沒拉滿會回到原位
            if(40>moveX&&moveX>0){//只能左滑不能右滑
                 e.currentTarget.style.setProperty('right',`calc(-14.5% + ${moveX}px)`);
            }

            else if(moveX>=40){//滑到底後，就return不能滑
                return;
            }
        }
        
        else{//再抓是不是處於已滑動位置,是了話只能右滑
            if(0>moveX&&moveX>-40){
                e.currentTarget.style.setProperty('right',`calc(-14.5% + 40px + ${moveX}px)`);
            }

            else if(moveX>=-40){//滑到底後，就return不能滑
                return;
            }
        }
        
    };

    const touchEndEvent=(e)=>{
        if(moveX<40){
            e.currentTarget.style.setProperty('right',`-14.5%`);
            setClassName("componentFrame");//改變成原狀態
            //沒拉滿就回到原位,或是一右滑就回原位
        }
        else if(moveX>=40){//如果左滑超過40
            setClassName("componentSlidedFrame");//改變成已滑動狀態
        }
    }

    





    //根據focusID來改變classname,寫在side function來避免每次都跑

    useEffect(()=>{
        props.productID===props.focusID?setClassName('componentSlidedFrame'):setClassName("componentFrame");
    },[props.focusID]);

    //根據改變的數量傳上去要處理的動作

        useEffect(()=>{
        let obj={};//宣告一個空集合，我怕此處宣告的物件記憶體位置都一樣，因此都還在讓他深復製一次

        if(currentNum===props.num){//變更的數字跟資料庫數字一樣了話，清除資料
            props.setFoucsCountObj({...obj});   
        }

        else if(currentNum>props.num){//如果變更數字大於資料庫數字
            props.setFoucsCountObj({
                ...obj,
                action:'add',
                num:currentNum-props.num,
                productID:props.productID
            });
        }

        else{//如果變更數字小於資料庫數字
            props.setFoucsCountObj({
                ...obj,
                action:'minus',
                num:props.num-currentNum,
                productID:props.productID
            })
        }

    },[currentNum]);


    //render的函式

    const renderFunc=()=>{

        if(props.focusID===""){//代表沒有任何修訂模式，樣板每個都可以滑
            return(
                <div
                    className={className} 
                    onTouchStartCapture={window.screen.width<810?touchStartEvent:null}
                    onTouchMoveCapture={window.screen.width<810? touchMoveEvent:null}              
                    onTouchEndCapture={window.screen.width<810? touchEndEvent:null}
                    // 這是只有手機板才有的功能              
                >
                    <div className="productName">{props.name}</div>
                    <div className="productPrice">{props.price}</div>
                    <div className="productNum">數量:{props.num}</div>
                </div>
                )
        }

        else if(props.productID===props.focusID){//代表目前這組在修訂模式，沒有任何左滑
            return(
                <div className={className} >
                    <div className="productName">{props.name}</div>
                    <div className="productPrice">{props.price}</div>
                    <div className="productNumFrame">
                        <div 
                            className="productNumControl"
                            onClick={()=>{
                                setCurrentNum(prev=>{
                                    if(prev>0){//代表還有數量可以減
                                        return prev-1;
                                    }
                                    else return prev;
                                })
                            }}
                        >-
                        </div>
                        <div className="productNum">數量:{currentNum}</div>
                        <div 
                            className="productNumControl"
                            onClick={()=>{
                                setCurrentNum(prev=>prev+1);
                            }}
                        >
                            +
                        </div>
                    </div>
                </div>
                )
        }

        else{//有其他組在修訂模式，這組就沒有任何功能並回歸原位
            return(
                <div className={className} style={{right:""}}>
                    {/* 一樣只有手機板才有的功能     */}

                    {
                    /* 這裡要特別注意，因為dom的className跟react className脫鉤的
                        browser會以dom為先，在滑動之後className就是componentSlidedFrame
                        不管我這裡render甚麼calssname，位置都保留在componentSlidedFrame的位置
                        不知道為甚麼只保留位置....下次用state來控制className比較好，
                        此處我使用style來回原位

                        112.01.23 已改成state控制
                    */}
                    <div className="productName">{props.name}</div>
                    <div className="productPrice">{props.price}</div>
                    <div className="productNum">數量:{props.num}</div>
                </div>
                )
        }
    };

    
    return(
        renderFunc()
    )
};

export default ShoppingCartComponent