module.exports = function otp(){
    let i=0;
    let code = "";
    while(i<5){
        code += Math.floor(Math.random() * 10);
        i++;
    }
    return code;
}



