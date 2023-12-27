// 게시글 정보관리 각종 웹페이지 요청과 응답처리 라우터 전용파일
// http://localhost:3000/article/~

var express = require('express');
var router = express.Router();

var db = require('../models/index');
var Op = db.Sequelize.Op;

// 게시글 등록 조회 웹페이지 요청 및 응답 라우팅 메소드
router.get('/list',async(req,res) =>{

    var searchOption = {
        boardTypeCode:"0",
        title:"",
        isDisplayCode:"9"
    }
    // 1) DB에서 모든 게시글 데이터 목록을 조회해 오기
    // var articles = await db.Article.findAll();

    // 지정한 컬럼만 조회하기
    // 
    var articles = await db.Article.findAll(
        {
            attributes: ['article_id', 'board_type_code', 'title', 'article_type_code', 'view_count', 'is_display_code', 'reg_date', 'reg_member_id'],
            where:{
                //is_display_code:1,
                //view_count: {[Op.not]:0}
            },
            order: [
                ['article_id','DESC']  // DESC 오름차순 ASC 내림차순
            ]
        }
    );
    

    // 2) 게시글 전체 목록을 list.ejs뷰에 전달
    res.render('article/list',{articles,searchOption});
});

//게시글 목록에서 조회옵션 데이터를 전달받아 조회옵션기반 게시글 목록 조회 후
//게시글 목록 페이지에 대한 요청과 응답처리
router.post('/list',async(req,res) =>{

    // 1) 사용자가 선택/입력한 조회옵션 데이터를 추출한다.
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    var searchOption = {
        boardTypeCode,
        title,
        isDisplayCode
    }

    // 2) 사용자가 입력/선택한 조회옵션 데이터를 기반으로 DB에서 게시글 목록을 재조회해온다
    // SELECT * FROM article WHERE board_type_code = 1 SQL 구문으로 변환되어 DB서버에 전달실행
    var articles = await db.Article.findAll({where:{board_type_code:searchOption.boardTypeCode}});

    // 3) 게시글 목록 페이지 list.ejs에 데이터 목록을 전달한다.
    res.render('article/list',{articles,searchOption});
});


// 신규 게시글 등록 웹페이지 요청 및 응답 라윙 메소드
router.get('/create',async(req,res) =>{
    res.render('article/create');
});

// 신규 게시글 사용자 등록 정보 처리 요청 및 응답 라우팅메소드
router.post('/create',async(req,res) =>{

    // 1) 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    // 2) 추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서
    // DB article테이블에 영구적으로 저장처리한다.
    // 저장처리 후 article테이블에 저장된 데이터 반환

    // 등록할 게시글 데이터
    // **중요 :  테이블에 저장/수정할 데이터 소스는 반드시 데이터모델의 속성명을 이용해야한다.
    // **조심 : article 모델 컬럼에 값이 반드시 들어와야하는 값(IS NOT NULL) 전달해야한다. 
    var article ={
        board_type_code: boardTypeCode,
        title,
        contents,
        view_count:0,
        ip_address:"111.222.222.222",
        article_type_code:articleTypeCode,
        is_display_code:isDisplayCode,
        reg_member_id:1,
        reg_date:Date.now()
    }


    // 게시글 정보를 article 테이블에 저장하고 저장된 값을 다시 반환받는다.
    //var registedArticle = await db.Article.create(article);
    await db.Article.create(article);


    // 3)등록처리 후 게시글 등록 웹페이지로 이동처리
    res.redirect('/article/list');
});


//기존 게시글 삭제처리 요청 및 응답 라우팅 메소드
//쿼리스트링방식
router.get('/delete',async(req,res) =>{

    // 1) 삭제하려는 게시글 고유번호를 추출한다.
    var articleIdx = req.query.aid;

    // 2) 게시번호기반으로 실제 DB article 테이블에서 데이터를 삭제처리한다.
    var deletedCnt = await db.Article.destroy({where:{article_id:articleIdx}});

    // 3) 삭제 처리 완료 후 게시글 목록 페이지로 이동시킨다.
    res.redirect('/article/list');
});


// 기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅 메소드
// 파라미터방식으로 전달받음 (와일드카드는 맨뒤로)
router.get('/modify/:aid',async(req,res) =>{

    // 1)선택한 게시글 고유번호를 파라메터 방식ㅇ로 URL을 통해 전달 받음
    var articleIdx = req.params.aid;

    // 2)해당 게시글 번호에 해당하는 특정 단일게시글 정보를 DB article테이블에서 조회해 온다.
    var article = await db.Article.findOne({where:{article_id:articleIdx}});

    // 3) 단일 게시글 정보를 뷰에 전달
    res.render('article/modify', {article});
});

//기존 게시글 사용자 수정정보 처리 요청 및 응답 라우팅 메소드
//파라미터방식으로 전달받음 (와일드카드는 맨뒤로)
router.post('/modify/:aid',async(req,res) =>{

    // 게시글 고유번호 URL파라메터에서 추출하기
    var articleIdx = req.params.aid;

    // 1) 사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;

    // 2) 추출된 사용자 입력데이터를 단일 게시글 json데이터로 구성해서
    // DB article테이블에 영구적으로 저장처리한다.
    // 수정 처리하면 처리건수값이 반환된다. 

    // 수정할 게시글 데이터
    var article ={
        board_type_code:boardTypeCode,
        title,
        contents,
        article_type_code:articleTypeCode,
        is_display_code:isDisplayCode,
        ip_address:"111.333.333.333",
        edit_member_id:1,
        edit_date:Date.now()
    };

    // DB article테이블의 컬럼 내용들 수정처리하고 수정건수 반환받기 
    // await db.Article.update(수정할데이터, 조건)는 
    // UPDATE atticle SET board_type_code=1, title='', contents=''... WHERE article_id
    //
    var wudatedCount = await db.Article.update(article,{where:{article_id:articleIdx}});

    // 3)수정처리 후 게시글 등록 웹페이지로 이동처리
    res.redirect('/article/list');

});





module.exports = router;