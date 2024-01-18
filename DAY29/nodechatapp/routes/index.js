// 공통 페이지 제공(로그인, 회원가입, 암호찾기)

var express = require('express');
var router = express.Router();

// bcrypt 참조
var bcrypt = require('bcryptjs');

// 로그인 여부 체크 사용자 권한 세션 미들웨어 참조하기
const {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');

// jwt 참조
const jwt = require('jsonwebtoken');

//DB참조
var db = require("../models/index");
const e = require('express');

/* GET home page. */
router.get('/', async(req, res,next) => {
  res.render('index');
});


//로그인 페이지 요청 및 응답
//http://localhost:3000/login
router.get('/login',isLoggedIn,async(req,res,next) =>{
  res.render('login',{resultMas:""});
});


//로그인 처리 요청 및 응답
// 로그인 완료 후 채팅 페이지 이동처리
//http://localhost:3000/login
router.post('/login',async(req,res,next) =>{
  
  // 로그인 정보 추출
  var email = req.body.email;
  var password = req.body.password;

  var member = await db.Member.findOne({where:{email:email}});
  var resultMsg = "";

  if(member == null){
    resultMsg ="동일한 메일주소가 존재하지 않습니다.";
    res.render('login.ejs',{resultMsg});

  }else{
    if(member.member_password == password){
      res.redirect('/chat');
    }else{
      resultMsg ="사용자 암호가 일치하지 않습니다.";
      res.render('login.ejs',{resultMsg});

    }
  }

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
  var name = req.body.name;

  // 단방향
  var encryptedPassword = await bcrypt.hash(password, 12);

  //step2: db신규 회원등록처리
  var member = {
    email:email,
    member_password:password,
    name:name,
    profile_img_path:"",
    telephone:"",
    entry_type_code:0,
    use_state_code:1,
    reg_date:Date.now(),
    reg_member_id:0
  };

  await db.Member.create(member);
  

  // 회원가입 완료 후 로그인 페이지 이동 처리
  //http://localhost:3000/login
  res.redirect('/login');
});


//암호 찾기 웹페이지 요청 및 응답
router.get('/find',async(req,res,next) =>{
  res.render('find');
});

//암초 찾기 처리 요청 및 응답
router.post('/fine',async(req,res,next) =>{
  
  // 암호 정보 추출
  var email = req.body.email;
  // 암호 정보 확인

  // 암호 찾기 완료 후 로그인 페이지 이동 처리
  // http://localhost:3000/login
  res.redirect('/login');
});


//JWT토큰 생성 웹페이지 요청 및 응답
router.get('/maketoken',async(req,res,next) =>{
  var token ="";

  res.render('maketoken.ejs',{layout:false,token});
});

//JWT토큰 생성 및 확인 요청 및 응답
router.post('/maketoken',async(req,res,next) =>{
  var token ="";

  //STEP1 : JWT토큰에 담을 JSON 데이터 구조 및 데이터 바인딩 
  var jwonTokenData ={
    userid: req.body.userid,
    email: req.body.email,
  }

  // STEP2
  //jwt.sign('JSON데이터',토큰인증키,{옵션(유효기간,발급자)})
  token = await jwt.sign(jwonTokenData, process.env.JWT_SECRET,{expiresIn:'24h',issuer:'gowoon'})

  res.render('maketoken.ejs',{layout:false,token});
});

// JWT토크 값을 수신하여 토큰값 해석하기
// http://localhost;3000/readtoken?token=토큰값
router.get('/readtoken',async(req,res,next) =>{
  var token =req.query.token;
  var tokenJsonData ={};

  try{
    var tokenJsonData =await jwt.verify(token,process.env.JWT_SECRET);

  }catch(err){
    token = "유효하지 않음";
    jwonTokenData ={
      userid: "",
      email: "",
    };
  }
  
  res.render('readtoken.ejs',{layout:false,token,tokenJsonData});
});




// 사용자 로그아웃 처리 라우팅 메소드

router.get('/logout',async(req,res,next)=>{
  // req.logout(function(err){

  //   //로그아웃하고 관리자 로그인 페이지로 이동 시키기
  //   //req.session.destroy();
    
  // });

  res.redirect('/login');
});

module.exports = router;
