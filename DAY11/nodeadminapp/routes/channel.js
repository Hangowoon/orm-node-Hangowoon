// 채팅방 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

//목폭 페이지 호출
//http://localhost:3001/channel/list
router.get('/list',async(req,res)=>{
    res.render('channel/list');
});

//신규 목록 페이지 호출
//http://localhost:3001/channel/create
router.get('/create',async(req,res)=>{
    res.render('channel/create');
});

//신규 목록 작성 완료 후 목폭 페이지 이동처리
//http://localhost:3001/channel/create
router.post('/create',async(req,res)=>{

    // 작성 목록 추출

    // 작성 목록 저장

    // 작성 환료 후 목록 페이지 이동
     res.redirect('/channel/list');
});

//수정 목록 페이지 호출
//http://localhost:3001/channel/modify
router.get('/modify',async(req,res)=>{
    res.render('channel/modify');
});

// 수정 목록 작성 완료 후 목록 페이지 이동 처리
//http://localhost:3001/channel/modify
router.post('/modify',async(req,res)=>{

    //수정 목록 추출

    //수정 목록 저장

    //수정 완료 후 목록 페이지 이동
    res.redirect('/channel/list');
});

// 목록 삭제 후 목록 페이지 이동 처리
router.get('/delete',async(req,res)=>{

    // 목록 페이지로 이동 
    res.redirect('/channel/list');
});




module.exports = router;