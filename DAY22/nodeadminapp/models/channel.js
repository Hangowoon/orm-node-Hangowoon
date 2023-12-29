module.exports = function(sequelize, DataTypes){

    return sequelize.define('channel',
    {
        channel_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '채널고유번호',
        },
        community_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '커뮤니티고유번호 기본값:1',
        },
        category_code: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: '채널분류 코드 0:그룹채널 1:일대일전용채널',
        },
        channel_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '채널명',
        },
        user_limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '접속자 제한수 ',
        },
        channel_img_path: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '채널 대표 이미지 주소',
        },
        channel_desc: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: '채널 간략소개',
        },
        channel_state_code: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '채널 오픈 상태 코드 0:미오픈 1:오픈',
        },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
        },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '등록자고유번호',
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        edit_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자고유번호',
        }

    },
    {
        sequelize,
        tableName: 'channel', // 기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
        timestamps: false,
        comment: '채널정보',
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'channel_id' }], // 여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
            },
        ],
        
    });

}