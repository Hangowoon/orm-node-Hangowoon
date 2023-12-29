module.exports = function(sequelize, DataTypes){

    return sequelize.define('member',
    {
        member_id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
            allowNull:false,
            comment:'회원고유번호'
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'사용자 메일주소'
        },
        member_password:{
            type:DataTypes.STRING(500),
            allowNull:false,
            comment:'사용자 난독화된 해시암호문자열'
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false,
            comment:'회원명'
        },
        profile_img_path:{
            type:DataTypes.STRING(300),
            allowNull:true,
            comment:'회원프로필 이미지경로'
        },
        telephone:{
            type:DataTypes.STRING(20),
            allowNull:true,
            comment:'전화번호'
        },
        entry_type_code:{
            type:DataTypes.TINYINT,
            allowNull:false,
            comment:'가입유형코드 0:직접가입 1:페이스북SNS'
        },
        use_state_code:{
            type:DataTypes.TINYINT,
            allowNull:false,
            comment:'이용상태 0:허용대기 1:사용중 2:탈퇴처리'
        },
        birth_date:{
            type:DataTypes.STRING(6),
            allowNull:true,
            comment:'생년월일'
        },
        reg_member_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:'등록자 고유번호'
        },
        edit_member_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:'수정자 고유번호'
        },
        reg_date:{
            type:DataTypes.DATE,
            allowNull:false,
            comment:'등록일시'
        },
        edit_date:{
            type:DataTypes.DATE,
            allowNull:false,
            comment:'수정일시'
        },
    },
    {
        sequelize,
        tableName: 'member', // 기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
        timestamps: false,
        comment: '회원정보',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'member_id' }], // 여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
            },
        ],

    });

}