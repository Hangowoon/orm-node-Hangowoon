// 채널/채팅 정보관리 RESTful API 전용 라우팅 기능 제공
// http://localhost:3000/api/channel

var express = require('express');
var router = express.Router();

// DB에 저장된 전체 채널 목록 데이터 조회
// http://localhost:3000/api/channel/all
router.get('/all', async(req, res) => {

  var channelList = [
    {channel_id:1, channel_name:"채널1"},
    {channel_id:2, channel_name:"채널2"},
    {channel_id:3, channel_name:"채널3"},
  ]

  res.json(channelList);

});


// 신규 채널정보 데이터 등록처리
// http://localhost:3000/api/channel/create
router.post('/create',async(req,res) => {
  
  // 1) 가정 데이터 전달
  /*
    {
      "channel_name":"채널1",
      "channel_desc":"채널설명1"
    }
  */

  // 2) json 데이터 추출
  var channelName = req.body.channel_name;
  var channelDescription = req.body.channel_desc;

  // 3) DB의 채널테이블에 해당 정보 저장하기 위한 jswon 객체 정의
  var channel = {
    channel_id:1,
    channel_name:channelName,
    channel_desc:channelDescription
  }

  // 4) DB에 채널테이블에 프론트에서 넘어온 데이터를 저장한다.

  // 5) 저장 후 반환되는 실제 DB에 저장된 단일 채널정보를 클라이언트에 반환

  res.json(channel);

});


//-----------------------------------미완성

// 기존 채널정보 데이터 수정처리


// 기존 채널정보 데이터 삭제 처리

//-----------------------------------




// 단일 채널 정보 데이터 조회
//쿼리스트링방식
// http://localhost:3000/api/channel?cid=1
router.get('/', async(req,res) =>{

  // 1) URL에서 채널고유번호를 추출
  var channelId = req.query.cid;

  // 2) 채널고유번호를 이용해 단일전의 채널정보 조회
  var channel = {
    channel_id:1,
    channel_name:"채널1"
  }

  //3) json데이터에 전달 
  res.json(channel);

})


// 단일 채널 정보 데이터 조회
// 파라미터방식-와일드카드정의 방식
// 파라미터방식/화일드카드방식은 라우터 파일의 최하단에 정의
// http://localhost:3000/api/channel/1
router.get('/:id', async(req,res) =>{

  // 1) URL에서 채널고유번호를 추출
  var channelId = req.params.id;

  // 2) 채널고유번호를 이용해 단일전의 채널정보 조회
  var channel = {
    channel_id:1,
    channel_name:"채널1"
  }

  //3) json데이터에 전달 
  res.json(channel);

})
  



module.exports = router;