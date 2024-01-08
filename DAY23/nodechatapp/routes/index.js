// 공통 페이지 제공(로그인, 회원가입, 암호찾기)

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res,next) => {
  res.render('index');
});


//로그인 페이지 요청 및 응답
//http://localhost:3000/login
router.get('/login',async(req,res,next) =>{
  res.render('login');
});


//로그인 처리 요청 및 응답
// 로그인 완료 후 채팅 페이지 이동처리
//http://localhost:3000/login
router.post('/login',async(req,res,next) =>{
  
  // 로그인 정보 추출

  // 로그인 정보 확인

  // 로그인 완료 후 채팅 페이지 이동 처리
  // http://localhost:3000/chat/index
  res.redirect('/chat');
});



// 회원가입 웹페이지 요청 및 응답
// http://localhost:3000/entry
router.get('/signup',async(req,res,next) =>{
  res.render('signup');
});

//회원가입 처리 요청 및 응답
//회웥가입 완료 후 로그인 페이지 이동처리
// http://localhost:3000/entry
router.post('/signup',async(req,res,next) =>{
  
  // 회원가입 정보 추출

  var email = req.body.email;
  var password = req.body.password;

  // 회원가입 정보 DB 저장

  

  // 회원가입 완료 후 로그인 페이지 이동 처리
  //http://localhost:3000/login
  res.redirect('/login');
});


//암호 찾기 웹페이지 요청 및 응답
// http://localhost:3000/find
router.get('/find',async(req,res,next) =>{
  res.render('find');
});

//암초 찾기 처리 요청 및 응답
//암호 찾기 완료 후 로그인 페이지 이동 처리
// http://localhost:3000/find
router.post('/fine',async(req,res,next) =>{
  
  // 암호 정보 추출
  var email = req.body.email;
  // 암호 정보 확인

  // 암호 찾기 완료 후 로그인 페이지 이동 처리
  // http://localhost:3000/login
  res.redirect('/login');
});




module.exports = router;
