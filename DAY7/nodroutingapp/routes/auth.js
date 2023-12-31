//auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답을 처리한다.
//모든 라우터 파일은 기본 라우팅 주소체계를 가진다.
//http://localhost:3000/ 라우터파일의 기본주소/라우팅메소드 의 주소
//http://localhost:3000/auth/ 라는 기본조소로 해당 라우터파일내 몯ㄴ 라우팅 메소드는 
//기본주소를 갖는다.

var express = require('express');
var router = express.Router();

//기능 : 로그인 퓁페이지 사용자 요청과 응답처리 라우팅 메소드
//호출주소 : http://localhost:3000/auth/login
//호출방식 : GET
router.get('/login',function(req,res){

    res.render('auth/login');
});

//기능 : 로그인 웹페이지에서 사용자가 입력한 메일주소/암호를 받아 로그인 처리 요청과 응답처리 라우팅메소드
//호출주소 : http://localhost:3000/auth/login
//호출방식 : POST
router.post('/login',function(req,res){

    //STEP1 : 사용자 로그인 페이지에서 사용자 입력한 메일주소와 암호값을 추출한다.
    //사용자가 입력한 값들은 웹브라우저를 통해 전달되기때문에 req=HttpRequest객체를 통해 사용자가 입력한 값을 추출한다.
    var email = req.body.email;
    var password = req.body.password;

    //SETP2 : 모델을 이용해 동일한 메일주소와 암호가 있는지 체크한다.


    //STEP3 : 정상적인 사용자 메일/암호인 경우 메인페이지로 사용자 웹페이지를 이동시켜준다.
    //res HttpResponse 객체의 redirect('도메인주소/하위url주소')메소드는 지정된 url주소체계로 사용자 웹페이지를 이동시켜준다.
    //res.redirect('http://www.naver.com');
    //res.redirect('http://localhost:3000/main');
    res.redirect('/main');
});


// 로그아웃 요청 및 응답처리 라우팅 메소드
//http;//localhost:3000/auth/logout
router.get('/logout',function(req,res){

    res.redirect("/main");
});


module.exports = router;