

const {odd,even} = require('./base1');  //객체형태
const checkOddOrEven = require('./base2');   //함수형태


function checkStringOddOrEven(str){
    if(str.length %2){
        return odd; //홀수입니다.
    }else{
        return even; //짝수입니다.
    }
};

console.log("숫자에 대해 홀수짝수여부를 판단해보자.", checkOddOrEven(5));
console.log("문자열 길이가 홀수인지 짝수인지 판단해보자.",checkStringOddOrEven("안녕하세요"));