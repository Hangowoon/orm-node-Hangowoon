//index.js=샘플 웹사이트의 공통 사용자 요청과 응담을 처리해주는 라우팅 파일(컨트롤러파일)

//express 웹개발 프레임워크 패키지 참조하기
var express = require('express');

//express 객체의 Router()메소드를 호출해서 router 객체를 생성한다.
//router 객체는 모든 사용자의 요청과 응답을 처리하는 핵심 객체힙니다. 
var router = express.Router();

//신규 메인페이지
//localhost:3000
router.get('/main',function(req,res){
  res.render('main');
})

/* 
-샘플 노드 익스프레스 웹사이트의 메인 웹페이지 요청과 응답처리 라우팅 메소드
-호출주소체계:http://localhost:3000/
-router.get()메소드는 사용자 클라이언트에서 직접 URL(주소체계)를 입력해서 최초호출하거나 
-또는 각종 링크주소를 클릭했을 때 발생함
-사용자가 url을 통해 서버에 무언가를 요청할때는 요청방식이 존재합니다.
-요청방식:get/post/put/delete/...
-router.get('사용자가 호출하는 주소', 호출된 주소에서 처리해야할 응답처리를 위한 콜백함수);
- 익명 콜벡함수 서버에서 클라이언트로 응답해주는 함수임 
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 회사소개 웹페이지 요청과 응답처리 라우팅 메소드
//step1: 라우팅 메소드의 기본 호출주소체계를 정의한다.
//http://localhost:3000/intro
//http://localhost:3000//company
//router.get('사용자가 호출하는 주소체계정의', 호출된 주소에서 처리해야할 응답처리를 위한 콜백함수);
router.get('/company',function(req,res){
  //req : httpRequest객체이고 웹브라우저 또는 클라이언트에서 넘어오는 각종 요청정보가 담겨있다.
  //req에는 웹브라우저에서 웹서버로 넘어오는 모든정보가 담겨있고, 담겨있는 정보를 추출할수 있다.

  //res는 HttpResponse객체로 웹서버에서 웹브라우저(클라이언트)로 응담을 처리해주는 객체이다.
  //웹서버에서 웹브라우저 또는 클라이언트로 특정 정보를 전달하고 싶을 때는 res객체를 사용한다.
  //주로 res를 이용해 서버상의 웹페이지(뷰), 데이터(json데이터)등을 전달한다. 
  //res.render('views폴더내의 특정뷰파일 지정', 뷰에 전달할 데이터)메소드는 views폴더내에 있는 지정한 view파일(.ejs)내의 html 내용을 웹브라우저로 전송한다.
  res.render('company.ejs',{companyName:"네이버", ceo:"한고운"});

});

//회사 연락처 정보 제공 웹페이지 요청과 응답 처리 라우팅 메소드
//http://localhost:3000/contact
//사용자 요청은 동일주소체계와 동일 요청방식(get/post)과 일치하는 라우팅 메소드를 찾아서 해당 메소드의 콜백함수가
//실행되어 응담이 전달된다.
router.get('/contact',function(req,res){
  res.render('sample/contact',
    {
      email:"tomato@naver.co.kr",
      telephone:"010-000-000"
    }
  );
});

//회사 제품소개 웹페이지 요청과 응답 처리 라우팅 메소드
//http://localhost:3000/products/computer
router.get('/products/computer',function(req,res){

  //
  const computer ={
    img:"https://www.lge.co.kr/kr/images/notebook/md09990827/gallery/medium12.jpg"
  }


  res.render('product/computer',{computer});
});

//회사 대표 인사말 웹페이지 요청과 응답처리 라우팅 메소드
//호출주소 : http://localhost:3000/selcome
//호출방식 : Get 방식으로 사용자가 요청해오면 router.get()메소드로 수신해줘야 한다.
//반환형식 : 웹페이지, 웹페이지+데이터, Only Data(RESTFul서비스)
router.get('/welcome',function(req,res){

  res.render('welcome.ejs');
});

//반드시 라우터 파일에서는 해당 라우터 객체를 외부로 exports를 통해 노출해눠야 한다.
module.exports = router;
