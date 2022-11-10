let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";

// 상품
const goods = document.getElementById("goods");

// 카테고리
const categoryAll = document.getElementById("item-all");
const categoryBro = document.getElementById("item-bro");
const categoryBean = document.getElementById("item-bean");
const categoryEnv = document.getElementById("item-env");
const categoryOni = document.getElementById("item-onion");
const categoryPota = document.getElementById("item-potato");
const categoryCuc = document.getElementById("item-cucumber");
const categorySpi = document.getElementById("item-spinach");
const categoryFro = document.getElementById("item-frozen");

const getList = function (
  img,
  delivery,
  name,
  description,
  price,
  manufacturer
) {
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
    tempGoodsText.innerText = `[${manufacturer}]` + `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    if (!manufacturer) {
      tempGoodsText.innerText = `${name}`;
    }

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
      location.href = "/item?너의선택=" + img;
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
// let filterSet = new Set();

const getFilter = function (manufacturer) {
  try {
    const filterLi = document.createElement("li");
    const filterImg = document.createElement("img");
    const filterA = document.createElement("a");
    const filterAa = document.createElement("a");

    filterImg.src = `/Category/imges/detailImg/check-circle.svg`;
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

const vegiCategories = function (category) {
  try {
    const tempAllA = document.createElement("a");
    const tempBroA = document.createElement("a");
    const tempBeanA = document.createElement("a");
    const tempEnvA = document.createElement("a");
    const tempOniA = document.createElement("a");
    const tempPotaA = document.createElement("a");
    const tempCucA = document.createElement("a");
    const tempSpiA = document.createElement("a");
    const tempFroA = document.createElement("a");

    tempAllA.innerText = "전체보기";
    tempBroA.innerText = `브로콜리·파프리카·양배추`;
    tempBeanA.innerText = `콩나물·버섯`;
    tempEnvA.innerText = `친환경`;
    tempOniA.innerText = `양파·대파·마늘·배추`;
    tempPotaA.innerText = `고구마·감자·당근`;
    tempCucA.innerText = `오이·호박·고추`;
    tempSpiA.innerText = `시금치·쌈채소·나물`;
    tempFroA.innerText = `냉동·이색·간편채소`;

    categoryAll.append(tempAllA);
    categoryBro.append(tempBroA);
    categoryBean.append(tempBeanA);
    categoryEnv.append(tempEnvA);
    categoryOni.append(tempOniA);
    categoryPota.append(tempPotaA);
    categoryCuc.append(tempCucA);
    categorySpi.append(tempSpiA);
    categoryFro.append(tempFroA);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 데이터 요청
// 채소
axios
  .post("/api/product/category", { data: "채소" })
  .then((data) => {
    vegiCategories();
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
        item.manufacturer,
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