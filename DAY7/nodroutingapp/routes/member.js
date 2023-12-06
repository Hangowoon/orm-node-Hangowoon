
var express = require('express');
var router = express.Router();

//약관동의 페이지 요청 및 응답
router.get('/join',function(req,res){

    res.render('member/join');
});

//회원가입 페이지 
router.get('/entry',function(req,res){

    res.render('member/entry');
});

//회원가입 시 사용자가 입력한 데이터를 받아 회원가입 요청과 응답 처리
router.post('/entry',function(req,res){

    //1. 웹브라우저에서 사용자가 입력한 회원정보 데이터 추출

    //2. 모델의 데이터베이스의 데이터 전송, 데이터 비교, 데이터 저장

    //3. 동일 데이터 없으면 회원가입 완료 페이지로 이동
    res.redirect('/member/entryok');
});

// 회원가입 완료 페이지
router.get('/entryok',function(req,res){

    res.render('member/entryok');
});



module.exports = router;