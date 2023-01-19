
let urlDatabase={
    '6344f4f842d22a539785d3a4':new URL('../commodityImg/IMG_4603.jpeg',import.meta.url),
    '63957add66bfda7defa48bcd':new URL('../commodityImg/IMG_4902.jpeg',import.meta.url),
    '63957c6066bfda7defa48bce':new URL('../commodityImg/IMG_4903.jpeg',import.meta.url),
    '63957d0a66bfda7defa48bcf':new URL("../commodityImg/IMG_4905.jpeg",import.meta.url)
}

export default function checkURL(name){
    return urlDatabase[name]//找出該名稱的url
    
};


