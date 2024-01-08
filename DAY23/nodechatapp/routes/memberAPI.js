// 회원 정보관리 RESTful API 전용 라우팅 기능 제공

var express = require('express');
var router = express.Router();

// DB에 저장된 전체 회원정보 목록 데이터 조회
// http://localhost:3000/api/member/all
router.get('/all', async(req, res) => {

  var memberList = [
    {member_id:1, member_name:"맴버1"},
    {member_id:2, member_name:"맴버2"},
    {member_id:3, member_name:"맴버3"},
  ]

  res.json(memberList);

});


// 신규 회원정보 데이터 등록처리
// http://localhost:3000/api/member/create
router.post('/create',async(req,res) => {
  
  // 1) 가정 데이터 전달
  /*
    {
      "member_name":"맴버1",
      "member_desc":"맴버설명1"
    }
  */

  // 2) json 데이터 추출
  var memberName = req.body.member_name;
  var memberDescription = req.body.member_desc;

  // 3) DB의 회원정보 테이블에 해당 정보 저장하기 위한 jswon 객체 정의
  var member = {
    member_id:1,
    member_name:memberName,
    member_desc:memberDescription
  }

  // 4) DB에 회원정보 테이블에 프론트에서 넘어온 데이터를 저장한다.

  // 5) 저장 후 반환되는 실제 DB에 저장된 단일 회원정보를 클라이언트에 반환

  res.json(member);

});


//-----------------------------------미완성

// 기존 회원정보 데이터 수정처리


// 기존 회원정보 데이터 삭제 처리

//-----------------------------------




// 단일 회원 정보 데이터 조회
//쿼리스트링방식
// http://localhost:3000/api/member?cid=1
router.get('/', async(req,res) =>{

  // 1) URL에서 회원 고유번호를 추출
  var memberId = req.query.cid;

  // 2) 회원 고유번호를 이용해 단일전의 회원정보 조회
  var member = {
    member_id:1,
    member_name:"맴버1"
  }

  //3) json데이터에 전달 
  res.json(member);

})


// 단일 회원 정보 데이터 조회
// 파라미터방식-와일드카드정의 방식
// 파라미터방식/화일드카드방식은 라우터 파일의 최하단에 정의
// http://localhost:3000/api/member/1
router.get('/:id', async(req,res) =>{

  // 1) URL에서 회원 고유번호를 추출
  var memberId = req.params.id;

  // 2) 회원 고유번호를 이용해 단일전의 회원정보 조회
  var member = {
    member_id:1,
    member_name:"맴버1"
  }

  //3) json데이터에 전달 
  res.json(member);

})
  



module.exports = router;