import { combineReducers } from "redux";


const memberState=(state="",action)=>{
    switch(action.type){
        case "memberlogin":
            return action.payload;

        case "memberlogout":
            return action.payload;
        
        default:return state;
    }
}

const memberShoppingCart=(state=[],action)=>{
    switch(action.type){
        case "ShowshoppingCart":
            let newlist=action.list.map(x=>x);//建立新記憶體陣列
            return newlist;//回傳新記憶體陣列

        case "AddItemToShoppingCart":
            return [...state,action.item]
            //更新新的物品
        default:return state;
    }
}

export default combineReducers({
    memberID:memberState,
    memberShoppingCart:memberShoppingCart
});