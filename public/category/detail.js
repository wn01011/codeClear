let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";

axios
  .post("/api/product/", { data: "채소" })
  .then((data) => {
    console.log(data.data[0].category[0]);
    console.log(data);
    data.data.forEach((item) => {
      getList(
        data.data[0].img,
        data.data[0].delivery,
        data.data[0].name,
        data.data[0].description,
        data.data[0].price
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

const goods = document.getElementById("goods");
const goodsImg = document.getElementById("goods-img");
const goodsDel = document.getElementById("goods-delivery");
const goodsText = document.getElementById("goods-name");
const goodsPrice = document.getElementById("goods-price");
const goodsInfo = document.getElementById("goods-info");
const goodsCart = document.getElementById("goods-cart");

async function getList(img, delivery, name, description, price) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    console.log(`/api/product/download${img}`);

    goodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    tempGoodsCart.style = `
    width: 30px;
    position: relative;
    top: -41px;
    left: 200px;
    `;

    goods.style = `
    display: block;
    `;

    goodsText.style = `
    line-height: 1.5;
    `;

    tempGoodsInfo.style = `
    padding-bottom: 10px;
    `;

    goods.append(tempGoodsDiv);
    goodsText.append(tempGoodsPrice);
    goodsText.append(tempGoodsText);
    goodsDel.append(tempGoodsDel);
    goodsInfo.append(tempGoodsInfo);
    goodsImg.after(tempGoodsCart);
  } catch (error) {
    console.log(error);
  }
}