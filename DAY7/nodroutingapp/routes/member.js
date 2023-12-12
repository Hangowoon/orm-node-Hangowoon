
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

    //step 1  사용자가  입력한 회원가입 정보를 추출한다.
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var telephone = req.body.telephone;

    //step 2 DB에 member 테이블에 동일한 사용자 메일주소가 있는지 체크한다.

    //step 3 메일주소가 중복되지 않으면 신규회원으로 해당 사용자 정보를 membe테이블에 저장한다. 
    //member테이블에 저장할 실제 사용자 정보

    var member = {
        id:id,
        email:email,
        password,
        name,
        telephone,
        entryDate:Date.now()
    }

    //step 4 데이터가 정상적으로 등록된 경우 사용자 웹페이지를 로그인 페이지로 이동 시켜준다. 
    res.redirect('/member/entryok');
});

// 회원가입 완료 페이지
router.get('/entryok',function(req,res){

    res.render('member/entryok');
});



module.exports = router;