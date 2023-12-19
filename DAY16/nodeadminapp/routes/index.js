// 공통기능 제공 (관리자 사이트 로그인/메인-대시보드)

var express = require('express');
var router = express.Router();


// 관리자 계정 로그인 완료 후 메인 웹페이지 요청 및 응답
// http://localhost:3001/
router.get('/',async(req,res,next)=>{
  res.render('index');
});

// 관리자 계정 로그인 웹페이지 요청 및 응답
// http://localhost:3001/login
router.get('/login',async(req,res,next)=>{
  res.render('login');
});


// 관리자 계정 로그인 처리 요청 및 응답 
// 로그인 완료 후 메인 페이지 이동처리
router.post('/login',async(req,res,next)=>{

  // 1) 사용자 정보 추출
  var id = req.body.id;
  var password = req.body.password;

  // 2) 사용자 정보 체크


  // 3) 정상이면 사용자 웹페이지로 이동 
  res.redirect('/');
});

//


module.exports = router;
