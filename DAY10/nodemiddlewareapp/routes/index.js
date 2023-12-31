var express = require('express');
var router = express.Router();

// 미들웨어 함수 참조하기
const {checkParms,checkQuerykKey} = require('./middleware.js');

// 라우터 미들웨어 함수 샘플3
// index.js 라우터가 실행될때마다 실행되는 미들웨어 함수 
router.use(function(req,res,next){
  console.log("Index.js라우터 미들웨어 함수 샘플1:",Date.now());
  next();
});

// 해당 라우터에서 해당 호출 주소체계와 일치하는 경우 매번 실행되는 미들웨어 함수
// http://localhost;3000/sample/computer
router.use('/sample/:id',function(req,res,next){
  console.log("Index 라우터 미들웨어 함수2-Request.URL=", req.originalUrl);
  next();
},function(req,res,next){
  console.log("Index 라우터 미들웨어 함수3-Request Type:",req.nethod);
  res.send(req.method);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//파라메터 id값이 존재하는 체크하는 미들웨어함수 적용하기
//http;//localhost:3000/test/gowoon
router.get('/test/:id', checkParms, function(req,res){
  res.render('index', {title: 'Express'});
});

//쿠리스트링 category키값이 존재하는지 체크하는 미들웨어함수 적용하기
//http;//localhost:3000/product?category=computer&stock=100
router.get('/product', checkQuerykKey, function(req,res){
  res.render('index', {title: 'Express'});
});

module.exports = router;
