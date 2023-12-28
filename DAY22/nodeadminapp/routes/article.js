// 게시글 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

//게시글 목폭 페이지 호출
//http://localhost:3001/article/list
router.get('/list',async(req,res,next)=>{

    let articles = [];

    res.render('article/list',{ articles });
});

//게시글 목폭 정보조회 페이지 호출
//http://localhost:3001/article/list
router.post('/list',async(req,res,next)=>{

    let articles = [];

    res.render('article/list',{ articles });
});


//신규 목록 페이지 호출
//http://localhost:3001/article/create
router.get('/create',async(req,res)=>{
    res.render('article/create');
});

//신규 목록 작성 완료 후 목폭 페이지 이동처리
//http://localhost:3001/article/create
router.post('/create',async(req,res)=>{

    // 작성 목록 추출

    // 작성 목록 저장

    // 작성 환료 후 목록 페이지 이동
     res.redirect('/article/list');
});


// 목록 삭제 후 목록 페이지 이동 처리
router.get('/delete',async(req,res)=>{

    let articleId = req.query.aid;

    // 목록 페이지로 이동 
    res.redirect('/article/list');
});




//수정 목록 페이지 호출
//http://localhost:3001/article/modify/1
router.get('/modify/:aid',async(req,res)=>{

    let articleId = req.params.aid;

    let article = {};

    res.render('article/modify',{ article });
});

// 수정 목록 작성 완료 후 목록 페이지 이동 처리
//http://localhost:3001/article/modify/1
router.post('/modify/:aid',async(req,res)=>{

    let articleId = req.params.aid; 

    //수정 목록 추출

    //수정 목록 저장

    //수정 완료 후 목록 페이지 이동
    res.redirect('/article/list');
});




module.exports = router;