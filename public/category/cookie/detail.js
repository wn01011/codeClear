let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";

// 상품
const goods = document.getElementById("goods");

// 카테고리
const categoryAll = document.getElementById("item-all");
const categoryEnv = document.getElementById("item-env");

const getList = function (img, delivery, name, description, price) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsA = document.createElement("a");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    categoryAll.onclick = (e) => {
      e.preventDefault();
    };

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    tempGoodsCart.style = `
    width: 30px;
    position: relative;
    top:130px;
    left: -40px;
    `;

    tempGoodsText.style = `
    display:block;
    line-height: 1.5;
    margin-top: 8px;
    `;

    tempGoodsPrice.style = `
    margin-top: 8px;
    `;
    tempGoodsInfo.style = `
    padding-bottom: 10px;
    `;

    goods.style = `
    display: flex;
    width: 837px;
    `;

    tempGoodsImg.style = `
    width: 249px;
    `;

    tempGoodsDiv.style = `
    display:flex;
    flex-wrap:wrap;
    width:279px
    `;

    tempGoodsInfo.style = `
    font-size: 12px;
    color: rgb(205, 204, 204);
    `;

    tempGoodsPrice.style = `
    font-weight: bold;
    `;

    tempGoodsDel.style = `
    font-size: 14px;
    `;

    goods.appendChild(tempGoodsDiv);
    tempGoodsDiv.append(tempGoodsA);
    // tempGoodsImg.append(tempGoodsA);
    tempGoodsA.append(tempGoodsImg);
    tempGoodsDiv.append(tempGoodsDel);
    tempGoodsDiv.append(tempGoodsText);
    tempGoodsDiv.append(tempGoodsPrice);
    tempGoodsDiv.append(tempGoodsInfo);
    tempGoodsDiv.append(tempGoodsCart);
    tempGoodsA.after(tempGoodsCart);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // 이미지 클릭시
    tempGoodsA.onclick = (e) => {
      e.preventDefault();
      console.log(tempGoodsA);
      detailItem();
    };
  } catch (error) {
    console.log(error);
  }
};

// 필터 사이드바 (브랜드명)
const brandFilter = document.getElementById("filter-brand");
const priceBrand = document.getElementById("brand-price");
let brandSet = new Set();

const getFilter = function (manufacturer) {
  try {
    const filterLi = document.createElement("li");
    const filterImg = document.createElement("img");
    const filterA = document.createElement("a");
    const filterAa = document.createElement("a");

    filterImg.src = `/category/imges/detailImg/check-circle.svg`;
    filterAa.innerText = `${manufacturer}`;
    filterAa.style = `
    margin-left: 20px;
    line-height: 2
    `;
    filterImg.style = `
    opacity: 0.3;
    `;

    brandFilter.append(filterLi);
    filterA.append(filterImg);
    filterLi.append(filterA);
    filterLi.append(filterAa);
  } catch (error) {
    console.log(error);
  }
};

const fruitCategories = function (category) {
  try {
    const tempAllA = document.createElement("a");
    const tempEnvA = document.createElement("a");

    tempAllA.innerText = "전체보기";
    tempEnvA.innerText = `쿠키!!!`;

    categoryAll.append(tempAllA);
    categoryEnv.append(tempEnvA);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 데이터 요청

axios
  .post("/api/product/category", { data: "쿠키" })
  .then((data) => {
    fruitCategories();
    console.log(data.data);
    data.data.forEach((item) => {
      // 카테고리별 아이템 추출
      const category = Object.values(item.category[0]);
      console.log(category[1]);
      getList(
        item.img,
        item.delivery,
        item.name,
        item.description,
        item.price,
        category
      );
      // 브랜드 추출
      if (!brandSet.has(item.manufacturer) && item.manufacturer != "") {
        brandSet.add(item.manufacturer);
        getFilter(item.manufacturer);
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });