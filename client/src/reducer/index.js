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

export default combineReducers({
    memberID:memberState
});