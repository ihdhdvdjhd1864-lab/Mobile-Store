let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a30000";
  }
}
let dataPro = [];
if (localStorage.getItem("product") != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}
submit.onclick = function () {
  let error = "";
  if (
    title.value == "" ||
    price.value == "" ||
    category.value == "" ||
    !Number.isInteger(Number(count.value))
  ) {
    error = "Please Enter Valid Data";
  }
  if (error != "") {
    let msg = document.getElementById("msg");
    msg.innerHTML = error;
    setTimeout(() => {
      msg.innerHTML = "";
    }, 2000);
    return;
  }
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mode === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    submit.innerHTML = "Create";
    mode = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  showData();
};
function showData() {
  getTotal();
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (!dataPro[i]) continue;
    let tr = document.createElement("tr");
    tr.innerHTML = `
  <td>${i + 1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button  onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  `;
    tbody.appendChild(tr);
  }
  deleteAllBtn();
}
showData();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAllBtn() {
  if (dataPro.length > 0) {
    let betAll = document.getElementById("deleteAll");
    betAll.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All (${dataPro.length})</button>`;
  } else {
    let betAll = document.getElementById("deleteAll");
    betAll.innerHTML = "";
  }
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  getTotal();
}
function updateData(j) {
  title.value = dataPro[j].title;
  price.value = dataPro[j].price;
  taxes.value = dataPro[j].taxes;
  ads.value = dataPro[j].ads;
  discount.value = dataPro[j].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[j].category;
  submit.innerHTML = "Update";
  mode = "update";
  tmp = j;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
  <td>${i + 1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
  <td><button  onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
  `;
        tbody.appendChild(tr);
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})">update</button></td>
      <td><button onclick="deleteData(${i})">delete</button></td>
      `;
        tbody.appendChild(tr);
      }
    }
  }
}

