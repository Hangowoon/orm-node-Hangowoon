var express = require('express');
var router = express.Router();

const Member = require('../schemas/member');

//회원목록조회
//http://localhost:3000/member/list
router.get('/list', async (req, res, next) => {
    try {

      const members = await Member.find({});
      res.json(members);

    } catch (err) {
      console.error(err);
      next(err);
    }
});


// 회원정보등록
//http://localhost:3000/member/create
router.get('/create', async (req, res, next) => {

    const memberid = req.body.memberid;
    const memberpwd = req.body.memberpwd;
    const membername = req.body.membername;
    const email = req.body.email;
    const age = req.body.age;
    const married = req.body.married;

    try {

        var memberData = {
            memberid,
            memberpwd,
            membername,
            email,
            age,
            married,
            createdAt:Date.now(),
        }

        const member = await Member.create(memberData);
        res.json(member);

    } catch (err) {
        console.error(err);
        next(err);
    }

});


module.exports = router;