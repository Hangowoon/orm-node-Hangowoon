USE modu_chat;

#member 테이블의 전체컬럼(*) 데이터 조회alter
SELECT *FROM member;

#CREATE DATA -데이터 등록/INSERT 구문
#INSERT INTO member(컬럼1, 컬럼2, ...) VALUES(컬럼1의 등록값, 컬럼2의값..);
INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test1@test.co.kr','1234','한고운','','010-0000-0000',1,1,'820427',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test2@test.co.kr','1234','한고운2','','010-0000-0002',1,1,'820428',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test3@test.co.kr','1234','한고운3','','010-0000-0003',1,1,'820429',now(),1);

INSERT INTO member(email,member_password,name,profile_img_path,telephone,entry_type_code,use_state_code,birth_date,reg_date,reg_member_id)
VALUES('test4@test.co.kr','1234','한고운4','','010-0000-0004',1,1,'820427',now(),1);




#READ DATA - 데이터 조회/SELECT 구문
SELECT * FROM member;
SELECT * FROM member WHERE email='test1@test.co.kr';
SELECT * FROM member WHERE entry_type_code = 1 AND name = '한고운';
SELECT * FROM member WHERE entry_type_code = 1 OR use_state_code = 0;
SELECT member_id,email,name,telephone FROM member WHERE member_id >= 3;
SELECT * FROM member WHERE name IN('한고운2','한고운3','한고운4');
SELECT * FROM member WHERE name LIKE '%한%'; #패턴매칭  한% 한으로 시작하는 모든항목.  %한%  한이 포함된 모든데이터,  %한 한으로 끝나는 모든 데이터

# 데이터 정렬
SELECT * FROM member ORDER BY member_id DESC;
SELECT * FROM member ORDER BY member_id ASC;



# UPDATE DATA - 데이터 수정/ UPDATE 구문
UPDATE member SET name = '한고운', profile_img_path = 'http://never.com/images/test.png' WHERE member_id=1;
UPDATE member SET use_state_code=0 WHERE member_id >2;


# DELETE DATA - 데이터 삭제/ DELETE 구문
DELETE FROM MEMBER WHERE 드먀ㅣ = 'test4@test.co.kr';
SELECT * FROM member;