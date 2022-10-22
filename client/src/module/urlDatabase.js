
let urlDatabase={
    '6344f4f842d22a539785d3a4':new URL('../commodityImg/IMG_4603.jpeg',import.meta.url)
};

export default function checkURL(name){
    return urlDatabase[name]
    
};


