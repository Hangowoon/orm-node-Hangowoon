// 채팅 페이지 정보관리 라우팅 기능 제공

var express = require('express');
var router = express.Router();

//채팅 정보관리 웹페이지 요청 및 응답
// http://localhost:3000/chat/
router.get('/', async(req, res, next) => {
    res.render('chat/index',{layout:"layout/baseLayout"});
    //res.render('chat/index',{layout:false});
});
  


module.exports = router;