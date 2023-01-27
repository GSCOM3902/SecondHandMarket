
export const memberlogin=(id)=>({
    type:"memberlogin",
    payload:id
});

export const memberlogout=()=>({
    type:"memberlogout",
    payload:""    
});

export const showMemberShoppingCart=(data)=>({
    type:'ShowshoppingCart',
    list:data
});

export const addItemToShoppingCart=(item)=>({
    type:"AddItemToShoppingCart",
    item:item
})


