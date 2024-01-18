var express = require('express');
var router = express.Router();


//passport 객체 참조
const passport = require('passport');

//권한 미들웨어 참조
const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');


/* 
기능 : 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출주소 : http://localhost:3000
*/
router.get('/',isLoggedIn, async(req, res, next) => {

  // 현재 로그인한 사용자 세션 정보 추출하기

  // case1 :  일반세션  기반 로그인 사용자 정보추출하기
  // var admin_id = req.session.loginUser.admin_id;

  // case2 : 패스포트 세션 기반 록인 사용자 정보 추출하기
  var admin_id = req.session.loginUser.admin_id;
  
  res.render('index.ejs');
});

/* 
기능 : 관리자 웹사이트 로그인페이지 요청과 응답처리 라우팅 메소드
호출주소 : http://localhost:3000/login
*/
router.get('/login', async(req, res, next) => {
  res.render('login.ejs');
});

/* 
기능 : 관리자 웹사이트 로그인페이지 요청과 응답처리 라우팅 메소드- 일반세션기반(express )
호출주소 : http://localhost:3000/login
*/
router.post('/login', async(req, res, next) => {
  res.render('login.ejs');
});

/* 
기능 : 관리자 웹사이트 로그인페이지 요청과 응답처리 라우팅 메소드- (passport)
호출주소 : http://localhost:3000/login
*/
router.post('/passportLogin', async(req, res, next) => {

  //패스포트 기반 로그인 인증처리 메소드 호출하여 패스포트 기반으로 로그인 실시한다. 
  // passport.authenticate('로그인전략=local',패스포트로그인 후 수행되는 콜백함수=done('패스포트실행결과-정상, 에러, 세션데이터,추가메시지'))
  passport.authenticate('local',(authError,admin,info)=>{

    // 패스포트인증시 에러가 발생한 경우 에러값이 반환됨.
    if(authError){
      console.log(authError);
      return next(authError);
    }

    //로컬전략 파일에서 전달된 관리자 세션데이터가 전달이 안된경우
    //동일 아이디와 암호가 없는 경우 done('',false)두번째 파라메터의 값이 false로 전달됨
    //아이디 암호가 틀린경우 체크 
    if(!admin){

      // flash패키지 설치필요: flash패키지는 서버 기반에서 특정 페이지 이동시 바로전에 특정데이터를 전달해주고 싶을 때 사용 
      //req.flash('키명',키값)
      req.flash('loginError',info.message);
      return res.redirect('/login');
    }

    //정상적으로 passport인증이 완료된 경우 
    // req.login('세션으로 저장할 데이터',처리결과 콜백함수(login실행시 발생한 에러값))은 passport기반 정상 인증이 완료되면 passport세션을 생성해주는 기능제공 
    return req.login(admin,(loginError)=>{
      if(loginError){
        console.log(loginError);
        return next(loginError);
      }

      // 정상적으로 세션데이터가 세션에 반영된 경우 처리
      return res.redirect('/'); //메일 대시보드 페이지이동 
    });
    
  })(req,res,next);
});



// 로그아웃 처리 라우팅 메소드


module.exports = router;
