var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config();

const cors = require("cors");

//// ORM 기반 DB 연결 정보 참조하기 / DB객체 안에 Sequelize 불러옴
var sequelize = require('./models/index').sequelize;

//express기반 서버세션 관리 팩키지 참조하기 
var session = require('express-session');

// layout 패키지 참조
var expressLayouts = require('express-ejs-layouts');

//웹페이지 요청과 용답처리 전용 라우터파일 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var channelRouter = require('./routes/channel');

// RESTful 데이터 요청과 응답처리 전용 라우터파일 참조
var memberAPIRouter = require('./routes/memberAPI');
var channelAPIRouter = require('./routes/channelAPI');

var app = express();

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync();


//express-session기반 서버세션 설정 구성하기 
app.use(
  session({
    resave: false,//매번 세션 강제 저장
    saveUninitialized: true, 
    secret: process.env.COOKIE_SECRET, //암호화할떄 사용하는 salt값
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge:1000 * 60 * 20 //20분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

//모든 RESTFUL호출에 대한 응답 허락하기-CORS ALL허락..
//app.use(cors());

//특정 도메인주소만 허가
// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     origin: ["http://localhost:3030", "https://beginmate.com"],
//   })
// );


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//레이아웃  설정
app.set('layout', 'layout/authLayout.ejs');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true); 
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', channelRouter);

app.use('/api/member', memberAPIRouter);
app.use('/api/channel', channelAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
