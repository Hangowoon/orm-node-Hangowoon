// 콜백 지옥!!!
// 콜백함수의 한계 : 콜백 지옥 ... 그래서 promise -> async/await 문법을 이용해
// 콜백함수의 콜백 지옥을 벗어나 자유롭게 비동기 프로그래밍 환경에서 
// 순차/절차 기반 프로그래밍을 손쉽게 해보자


//지옥
var fnHell = function(){
    console.log("로직1 완료");

    //두번째로직 구현함수
    setTimeout(function(){
        console.log("로직2 완료");

        //세번째로직 구현함수
        setTimeout(function(){
            console.log("로직3 완료");

            //네번째로직 구현함수
            setTimeout(function(){
                console.log("로직4 완료");

                //다섯번째로직 구현함수
                setTimeout(function(){
                    console.log("로직5 완료");

                },1000);

            },1000);

        },1000);

    },1000);
   
}


//천국
var fnHeaven = function(){
    console.log("로직1 완료");

    //두번째로직 구현함수
    setTimeout(function(){
        console.log("로직2 완료");

    },1000);

    //세번째로직 구현함수
    setTimeout(function(){
        console.log("로직3 완료");

    },2000);

    //네번째로직 구현함수
    setTimeout(function(){
        console.log("로직4 완료");

    },3000);

   //다섯번째로직 구현함수
   setTimeout(function(){
        console.log("로직5 완료");

    },4000);
}


//지옥을 불러오기
//fnHell();

//개발자가 원하는바는 천국
fnHeaven();