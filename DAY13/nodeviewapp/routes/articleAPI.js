//게시글 데이터 관리 전용 RESTFul API 라우터 파일
//기본 라우터 호출주소 : http://localhost:3000/api/article/~

var express = require("express");
var router = express.Router();

//신규 게시글 목록 데이터 조회 반한 API 라우팅 메소드
//http://localhost:3000/api/article/all
router.get("/all", async (req, res) => {
  //step1. API라우팅 메소드 반환형식 정의
  var apiResult = {
    code: 200,
    data: [],
    result: "Ok",
  };
  //step2. 예외처리 구문..
  try {
    //step3. try블록안에 에러가 발생할수 있는 각종 개발자 코드 구현
    const articles = [
      {
        article_id: 1,
        board_type_code: 1,
        title: "공지게시글 1번글입니다.",
        contents: "공지게시글 1번 내용입니다.",
        view_count: 10,
        ip_address: "111,111,123,123",
        is_display_code: 1,
        reg_date: "2023-12-14",
        reg_member_id: "sungwoo",
      },
      {
        article_id: 2,
        board_type_code: 1,
        title: "공지게시글 2번글입니다.",
        contents: "공지게시글 2번 내용입니다.",
        view_count: 20,
        ip_address: "111,111,123,123",
        is_display_code: 1,
        reg_date: "2023-12-14",
        reg_member_id: "sungwoo",
      },
      {
        article_id: 3,
        board_type_code: 1,
        title: "공지게시글 3번글입니다.",
        contents: "공지게시글 3번 내용입니다.",
        view_count: 30,
        ip_address: "111,111,123,123",
        is_display_code: 1,
        reg_date: "2023-12-14",
        reg_member_id: "sungwoo",
      },
    ];

    //프론트엔드로 반환할 실제데이터 바인딩
    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = "OK";
  } catch (err) {
    //console.log(err.message);
    //서버측 에러코드는 프론트엔드나 사용자에게 직접 정보를 제공하지 않고 대표 메세지를 안내합니다.
    //서버측 에러코드는 추후 별도 로깅시스템 구현을 통해 서버에 특정폴더내에 로드파일로 기록하거나.
    //벡엔드 에러발생 알림 시스템(sms, email등등)을 통해 실시간 에러정보를 노티해준다.
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Fail";
  }

  res.json(apiResult);
});

//신규 게시글 등록처리 API 반한 라우팅 메소드
//http://localhost:3000/api/article/create
router.post("/create", async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: "Ok",
  };


  try{

    // 1)사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;


    // 2)추출된 사용자 입력데이터를 단일 게시글 json 데이터로 구성해서
    // DB article테이블에 영구적으로 저장한다. 
    // 저장처리 후 article테이블에 저장된 데이터 반환됨

    // 등록할 게시글 데이터
    var article ={
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate:Date.now()
    }

    //2) DB article 테이블에 데이터를 등록하고 등록된 데이터가 반환
    var savedArticle ={
        article_id: 1,
        board_type_code: 1,
        title: "공지게시글 1번글입니다.",
        contents: "공지게시글 1번 내용입니다.",
        view_count: 10,
        ip_address: "111,111,123,123",
        is_display_code: 1,
        reg_date: "2023-12-14",
        reg_member_id: "gowoon",
      }

      // 3) 정상 데이터 등록처리 결과값 세팅하기
      apiResult.code = 200;
      apiResult.date = savedArticle;
      apiResult.result = "Ok"


  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed"
  }


  res.json(apiResult);
});

//단일 게시글 수정처리 API 라우팅 메소드
//http://localhost:3000/api/article/update
router.post("/update", async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: "Ok",
  };

  try{
    // 1) 사용자가 수정한 게시글 수정 데이터 추출
    var articleIdx = req.body.articleIdx;

    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;


    // 2)추출된 사용자 수정데이터를 단일 게시글 json 데이터로 구성해서
    // DB article테이블에 수정 처리 반영한다. 
    // 수정처리 후 적용 건수 반환됨

    // 수정할 게시글 데이터
    var article ={
      articleIdx,
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate:Date.now()
    };

    // 2) 수정처리 후 처리건수가 반환됨
    // db수정처리함 처리 후 적용건수 1이 반환되었다고 가정함
    var affectedCnt = 1;

    // 3) 정상 수정된 정보를 apiResult객체 바인딩함
    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = "Ok"


  }catch(err){
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Failed"

  };

  res.json(apiResult);
});

//단일 게시글 데이터 조회 반환 API 라우팅 메소드
//http://localhost:3000/api/article/1
router.get("/:aidx", async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: "Ok",
  };

  try{

    // 1) url을 통해 전달된 게시글 고유번호를 추출한다.
    var articleIdx = req.params.aidx;

    // 2) 게시글 고유번호에 해당하는 단일 게시글 정보를 DB에서 조회해온다.
    var article = {
      article_id: 1,
      board_type_code: 1,
      title: "공지게시글 1번글입니다.",
      contents: "공지게시글 1번 내용입니다.",
      view_count: 10,
      ip_address: "111,111,123,123",
      is_display_code: 1,
      article_type_code:1,
      reg_date: "2023-12-14",
      reg_member_id: "gowoon",
    };

    // 3) 정상 조회된 정보를 apiResult 객체 바인딩함 
    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "Ok"


  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed"

  };

  res.json(apiResult);
});

//단일 전체 게시글 삭제처리 API 조회 반환 라우팅 메소드
//http://localhost:3000/api/article/1
router.delete("/:aidx", async (req, res) => {
  var apiResult = {
    code: 200,
    data: [],
    result: "Ok",
  };

  try{

    // 1) url 주소에서 게시글 고유번호를 추출한다. 
    var articleIdx = req.params.aidx;

    // 2) db의 article테이블에서 해당 게시글 번호글을 완전 삭제처리한다. 

    // 3) db에서 삭제된 건수가 전달된다. 
    var deletedCnt = 1;

    // 4) 정상 삭제된 정보를 apiResult객체 바인딩함
    apiResult.code = 200;
    apiResult.data = deletedCnt;
    apiResult.result = "Ok"

  }catch(err){
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Failed"

  }

  res.json(apiResult);
});

module.exports = router;
