// 사용자 계정 정보(사용자 사이트에서 가입한 사용자정보) 관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

// 날짜 변환 패키지 참조 
var moment = require('moment');

// ORM DB객체 참조 
var db = require('../models/index');


//회원목폭 웹 페이지 호출
//http://localhost:3001/member/list
router.get('/list',async(req,res,next)=>{

    // article 테이블의 모든 선택 목록을 조회해옴 
    let members = await db.Member.findAll();

    res.render('member/list',{ members,moment});
});

//회원 정보조회 처리
//http://localhost:3001/member/list
router.post('/list',async(req,res,next)=>{
    res.render('member/list');
});



//신규 회원목록 페이지 호출
//http://localhost:3001/member/create
router.get('/create',async(req,res,next)=>{
    res.render('member/create');
});

//신규 회원목록 작성 완료 후 목폭 페이지 이동처리
//http://localhost:3001/member/create
router.post('/create',async(req,res,next)=>{

    // 작성 목록 추출 
    // view 파일에서 추출 데이터 확인 
    let email = req.body.email;
    let member_password = req.body.password;
    let name = req.body.name;
    let profile_img_path = req.body.file;
    let telephone = req.body.telephone;
    let birth_date = req.body.birthday;
    let entry_type_code = req.body.createTypeCode;
    let use_state_code = req.body.createStateCode;
    

    // DB 테이블에 저장할 json 단일데이터 구조 정의
    // 속성명은 데이터 모델(models/member.js)의 속성명과 동일 
    let member ={
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code,
        use_state_code,
        birth_date,
        reg_date:Date.now(),
        reg_member_id:0,
        edit_date:Date.now(),
        edit_member_id:0
    }

    // 신규 회원 정보가 등록 
    // create()메소드는 등록된 db의 데이터를 반환
    var registedMember = await db.Member.create(member);

    // 작성 환료 후 목록 페이지 이동
     res.redirect('/member/list');
});




// 목록 삭제 후 목록 페이지 이동 처리
router.get('/delete',async(req,res)=>{

    // 목록 페이지로 이동 
    res.redirect('/member/list');
});




//회원목록 확인 및 수정 페이지 호출
//http://localhost:3001/member/modify/1
router.get('/modify/:mid',async(req,res)=>{
    res.render('member/modify');
});

// 회원목록 작성 완료 후 목록 페이지 이동 처리
//http://localhost:3001/member/modify/1
router.post('/modify/:mid',async(req,res)=>{

    //수정 목록 추출

    //수정 목록 저장

    //수정 완료 후 목록 페이지 이동
    res.redirect('/member/list');
});



module.exports = router;