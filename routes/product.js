const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const router = Router();

// "/api/product"
router
  .route("/")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    res.send("post로 요청을 보냈군요?");
  });

// product.json 파일 넣는 곳
// fs.readFile("./product.json", "utf-8", function (err, data) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     if (data) {
//       JSON.parse(data).forEach((item) => {
//         try {
//           db.ProductTable.create(item);
//         } catch (err) {
//           console.error(err);
//         }
//       });
//     }
//   }
// });

// productdb create 양식

// db.ProductTable.create({
//   img: "1",
//   manufacturer: "브로드카세",
//   name: "부드러운 비엔나 쿠키 4종",
//   price: 5500,
//   description: "버터 풍미의 쿠키와 부드러운 여유",
//   delivery: "샛별배송",
//   seller: "컬리",
//   package: "상온(종이포장)",
//   unit: "1봉",
//   weight: "100g",
//   origin: "상세페이지 별도 표기",
//   allergy: "밀, 우유, 난류",
//   category: [{ 0: "쿠키" }],
// });

// userdb select 양식

// db.userdb.UserTable.findOne({ where: { id: 1 } })
//   .then((data) => {
//     console.log(data.dataValues);
//   })
//   .catch((err) => console.error(err));

module.exports = router;