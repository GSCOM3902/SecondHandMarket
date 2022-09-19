import { combineReducers } from "redux";


const test=(state=0,action)=>{
    switch(action.type){
        case "test":
            return action.payload;
        
        default:return state;
    }
}

export default combineReducers({
    test:test
});