const Sequelize = require("sequelize");

module.exports = class orderTable extends Sequelize.Model {
  // static == class를 new 하지 않고 메서드를 불러온다.
  static init(sequelize) {
    return super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userId: {
          type: Sequelize.STRING(255), // VARCHAR
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING(255), // VARCHAR
          allowNull: true,
        },
        product: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        count: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize, // 기본
        timestamps: true, // createAt, updateAt 자동으로 추가
        underscored: true, // 테이블과 컬럼명을 카멜 케이스로 수정
        modelName: "Order_Table", // Javascript에서 사용하는 테이블명
        tableName: "order_table", // MySQL에 있는 테이블명
        paranoid: false, // 삭제 시 deletedAt을 저장할지, 테이블에서 데이터를 삭제 시 아예 삭제를 할 것인가? 아니면 삭제한 날짜를 남김으로써 데이터를 남길 것인가.?
        charset: "utf8mb4", // 언어 포멧 설정
        collate: "utf8mb4_general_ci", // 언어 포멧 설정
      }
    );
  }

  static associate(db) {
    // 데이터 베이스 관계 설정에 필요함
  }
};
