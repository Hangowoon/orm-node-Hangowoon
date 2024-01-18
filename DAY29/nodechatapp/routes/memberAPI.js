// 회원 정보관리 RESTful API 전용 라우팅 기능 제공

var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
var AES = require('mysql-ase');
var db = require('../models/index');

// 사용자 토큰제공여부 체크 미드웨어 참조하기
var {tokenAuthChecking} = require('./apiMiddleware');

// 신규회원 가입처리 RESTful API 라우팅 메소드
// http://localhost:3000/api/member/signup
router.post('/signup', async(req,res,next)=>{
  var apiResult={
    code:400,
    data:null,
    msg:""
  };

  try{
    var email = req.body.email;
    var password = req.body.password;

    var member = await db.Member.findOne({where:{email.:email}});
    var resultMsg = "";

    if(member == null){
      resultMas = "NotExistEmail";
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    }else{

      //step2: 단방향암호화 기반 동일암호 일치여부 체크
      // 단방향 암호화 해시 알고리즘 암호 체크
      var compareResult = await bcrypt.compare(password,member.member);

      if(compareResult){
        resultMsg="Ok";

        member.member_password = "";
        member.telephone = AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

        // step3: 인증된 사용자의 기본정보 JWT토큰 생성 발급
        // step3.1: JWT토큰에 담을 사용자 정보 생성
        // JWT인증 사용자정보 토큰 값 구조 정의 및 데이터 세팅 

        var memberTokenData ={
          member_id:member.member_id,
          email:member.email,
          name:member.name,
          profile_img_path:member.profile_img_path,
          telephone:member.telephone,
          etc:"기타정보",
        };

        var token = await jwt.sign(memberTokenData,process.env.JWT_SECRET,{expirasIn:'24h',issuer:'msoftware'});

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = resultMsg;
      }else{
        resultMsg="NotCorrectPassword";

        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = resultMsg;

      }
    }
  }catch(err){
    console.log("서버에러발생-/api/member/signup:",err.message);
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.mas = "Failed";

  }

  res.json(apiResult);
});

router.post('/login', async(req,res,next)=>{
  res.json({});
});

router.post('/find', async(req,res,next)=>{
  res.json({});
});

router.get('/pfofile',tokenAuthChecking, async(req,res,next)=>{
  var apiResult ={
    code:400,
    data:nall,
    msg:""
  };

  try{
    // step1 : 웹브라우저 헤더에서 사용자 JWT Bearer 인증토큰값을 추출한다. 
    // req.headers.authorization = "Bearer FHKDFJDKJFKDJKSJFSK"
    var token = req.headers.authorization.split('Bearer')[1];
    var tokenJsonData = await jwt.verify(token,process.env.JWT_SECRET);

    var loginMemberId = tokenJsonData.member_id;
    var loginMemberEmail = tokenJsonData.email;

    var dbMember = await db.Member.findOne({
      where:{member_id:loginMemberId},
      attributes:['email','name','profile_img_path','telephone','birth_date']
    });

    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.mas = "OK";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.mas = "Failed";

  }

  res.json(apiResult);
});


module.exports = router;