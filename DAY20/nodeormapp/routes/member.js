// 사용자 정보처리를 위한 웹페이지 요청과 응답처리 전용 라우터 파일

var express = require('express');
var router = express.Router();

// Model 영역에서 db객체 참조하기
var db = require('../models/index');
const e = require('express');

// 회원가입 웹페이지 요청 및 응답처리
//get
router.get('/entry', async(req, res, next) => {
  res.render('member/entry.ejs');
});


// 회원가입 웹페이지 응답처리
//post
router.post('/entry', async(req, res, next) => {

    //1) 회원가입정보 추출
    var email = req.body.email;
    var password = req.body.password;

    //2) 데이터 베이스에 members테이블 데이터를 저장 
    // DB에 전달되는 JSON데이터의 속성명은 반드시 해당 데이터모델(models/member.js)의 속성명과 동일해야 함 
    var member ={
        email:email,
        password:password
    };

    //3) db에 저장하고 저장된 값을 반환받는다. 
    //db.Member.create()는 ORM 프레임워크에 의해서 백엔드에서 
    //INSERT INTO members(email,password, createdAt)Values
    var savedMember = await db.Member.create(member);

    //4) 메인 페이지로 이동 
    res.redirect('/member/login');
});


// 로그인 웹페이지 요청 및 응답처리
//get
router.get('/login', async(req, res, next) => {
    res.render('member/login.ejs',{resultMsg:"", email:"", password:""});
});
  
  
// 로그인 웹페이지 응답처리
//post
router.post('/login', async(req, res, next) => {

    //1)
    var email = req.body.email;
    var password = req.body.password;

    //2)DB members테이블에서 동일한 메일주소의 단일사용자 정보 조회
    // db.Member.FindOne(해당 컬럼과 동일한 조건 설정) ORM메소드는 
    // SELECT * FROM members WHERE email='사용자입력메일주소값'; 의 
    // SQL 구문을 백엔드 환경에서 동적으로 만들어서 
    //MYSQL 서버로 전달해 실행하고 조회결과물을 반환받는다. 
    var member = await db.Member.findOne({where:{email:email}});

    // 3) 로그인 처리 로직 구현
    var resultMsg = '';

    if(member == null){
        resultMsg = '동일한 메일주소가 존재하지 않습니다.';
    }else{

        //db에 저장된 조회된 사용자의 암호값과 사용자가 입력한 암호값이 일치하면
        if (member.password == password){
            res.redirect('/');
        }else{
            resultMsg = '암호가 일치하지 않습니다.';
        }
    }

    if(resultMsg !== ''){
        res.render('member/login.ejs', {resultMsg, email, password});
    }

    //res.redirect('/');
});
  


module.exports = router;