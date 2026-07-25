// حماية الداشبورد - التأكد من تسجيل الدخول
if (sessionStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// دالة تسجيل الخروج
function logout() {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// إخفاء شاشة التحميل بعد 3 ثواني (3000ms)

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    let loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("hide");
    }
  }, 3000); // 👉 هنا الـ 3 ثواني، تقدر تزودها أو تقللها براحتك
});

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
updateDashboard();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
  updateDashboard();
}

function deleteAllBtn() {
  if (dataPro.length > 0) {
    let betAll = document.getElementById("deleteAll");
    betAll.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All (${dataPro.length})</button>`;
  } else {
    let betAll = document.getElementById("deleteAll");
    betAll.innerHTML = "";
  }
  updateDashboard();
}

function deleteAll() {
  localStorage.removeItem("product");
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
  updateDashboard();
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
  updateDashboard();
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
  if (searchMood === "title") {
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

let up = document.querySelector(".up");

window.onscroll = function () {
  if (window.scrollY >= 500) {
    up.style.display = "block";
    up.style.opacity = "1";
  } else {
    up.style.display = "none";
  }
};

up.onclick = function () {
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

// دالة تحديث بيانات الداشبورد
function updateDashboard() {
  let totalProducts = dataPro.length;
  let totalMoney = 0;
  let categories = new Set();
  let maxPrice = 0;
  let minPrice = dataPro.length > 0 ? +dataPro[0].total : 0;
  for (let i = 0; i < dataPro.length; i++) {
    // حساب المجموع الكلي للأموال
    totalMoney += +dataPro[i].total;
    // تجميع الأقسام الفريدة بدون تكرار
    if (dataPro[i].category) {
      categories.add(dataPro[i].category.toLowerCase());
    }
    // تحديد أعلى سعر
    maxPrice = Math.max(maxPrice, +dataPro[i].total);
    minPrice = Math.min(minPrice, +dataPro[i].total);
  }

  // طباعة النتائج في الكروت
  document.getElementById("dash-total-products").innerHTML = totalProducts;
  document.getElementById("dash-total-money").innerHTML =
    "$" + totalMoney.toLocaleString();
  document.getElementById("dash-total-categories").innerHTML = categories.size;
  document.getElementById("dash-highest-price").innerHTML =
    "$" + maxPrice.toLocaleString();
  document.getElementById("dash-lowest-price").innerHTML =
    "$" + minPrice.toLocaleString();
}

updateDashboard();

/* اكسيل تصدير📊📊################### ؟؟؟؟  */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  let toast = document.createElement("div");

  let icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  let iconColor = type === "success" ? "#10b981" : "#ef4444";

  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color: ${iconColor}; font-size: 18px;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // إزالة الإشعار بعد 3 ثواني تلقائياً
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function exportToCSV() {
  if (dataPro.length === 0) {
    showToast("لا توجد بيانات لتصديرها!", "error");
    return;
  }

  // عناوين الأعمدة
  let csvContent = "\uFEFF"; // دعم اللغة العربية في إكسيل
  csvContent += "ID,Title,Price,Taxes,Ads,Discount,Total,Category\n";

  // تجميع السطور من Array البيانات
  dataPro.forEach((pro, index) => {
    let row = [
      index + 1,
      `"${pro.title}"`,
      pro.price,
      pro.taxes,
      pro.ads,
      pro.discount,
      pro.total,
      `"${pro.category}"`,
    ];
    csvContent += row.join(",") + "\n";
  });

  // إنشاء رابط التنزيل أوتوماتيكياً
  let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  let url = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `Mobile_Store_Data_${new Date().toLocaleDateString()}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("تم تصدير ملف Excel بنجاح! 📊", "success");
} /* اكسيل تصدير📊📊################### ؟؟؟؟  */

// دالة التحويل بين المود المظلم والمضيء مع حفظ الاختيار
function toggleTheme() {
  let body = document.body;
  let icon = document.getElementById("theme-icon");
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    icon.className = "fa-solid fa-sun";
    localStorage.setItem("theme", "light");
    showToast("تم التفعيل: الوضع المضيء ☀️", "info");
  } else {
    icon.className = "fa-solid fa-moon";
    localStorage.setItem("theme", "dark");
    showToast("تم التفعيل: الوضع المظلم 🌙", "info");
  }
}
// قراءة الثيم المحفوظ أول ما الصفحة تفتح
window.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");
  let icon = document.getElementById("theme-icon");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (icon) icon.className = "fa-solid fa-sun";
  }
});

let ueas = document.querySelector("#client-name");
let phone = document.querySelector("#client-phone");
let email = document.querySelector("#client-email");
let address = document.querySelector("#client-address");
let submit22 = document.querySelector("#client-submit");
let search = document.querySelector("#search-client");
let tbody = document.querySelector("#tbody-clients");
let msg = document.querySelector("#client-msg");
let dashtoTalClients = document.querySelector("#dash-total-clients");

let dataClient = [];

submit22.addEventListener("click", () => {
  let client = {
    name: ueas.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
  };
  dataClient.push(client);
  let error220 = "";
  if (
    ueas.value.trim() === "" ||
    phone.value.trim() === "" ||
    email.value.trim() === "" ||
    address.value.trim() === ""
  ) {
    error220 = "Please Enter Valid Data";
    let clientmsg = document.getElementById("client-msg");
    clientmsg.innerHTML = error220;
    setTimeout(() => {
      clientmsg.innerHTML = "";
    }, 2000);
    return;
  }
  localStorage.setItem("dataClient", JSON.stringify(dataClient));
  showDataClient();
  ueas.value = "";
  phone.value = "";
  email.value = "";
  address.value = "";
});

function showDataClient() {
  tbody.innerHTML = "";
  dataClient = JSON.parse(localStorage.getItem("dataClient")) || [];
  dataClient.forEach((client, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${`<i class="fa-solid fa-user"></i>`}</td>
    <td>${client.name}</td>
    <td>${client.phone}</td>
    <td>${client.email}</td>
    <td>${client.address}</td>
    <td><button onclick="deleteClient(${index})" class="delete22">delete</button></td>
    `;
    tbody.appendChild(tr);
    dashtoTalClients.innerHTML = dataClient.length;
  });
}
showDataClient();

function deleteClient(index) {
  if (confirm("هل تريد حذف هذا العميل؟")) {
    dataClient.splice(index, 1);
    localStorage.setItem("dataClient", JSON.stringify(dataClient));
    showDataClient();
  }
}

search.addEventListener("input", () => {
  let value = search.value.toLowerCase();
  let filteredData = dataClient.filter((client) => {
    return (
      client.name.toLowerCase().includes(value) ||
      client.phone.toLowerCase().includes(value) ||
      client.email.toLowerCase().includes(value)
    );
  });
  tbody.innerHTML = "";
  filteredData.forEach((client, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${client.name}</td>
    <td>${client.phone}</td>
    <td>${client.email}</td>
    <td>${client.address}</td>
    <td><button onclick="deleteClient(${index})" class="delete22">delete</button></td>
    `;
    tbody.appendChild(tr);
  });
});

let empName = document.querySelector("#emp-name");
let empRole = document.querySelector("#emp-role");
let empSalary = document.querySelector("#emp-salary");
let empDate = document.querySelector("#emp-date");
let empSubmit = document.querySelector("#emp-submit");
let tbodyEmployees = document.querySelector("#tbody-employees");
let dashTotalEmployeess = document.querySelector("#dash-total-employees");
let arrEmployees = [];
empSubmit.addEventListener("click", () => {
  let employee = {
    name: empName.value,
    role: empRole.value,
    salary: empSalary.value,
    date: empDate.value,
  };
if (
  empName.value === "" ||
  empRole.value === "" ||
  empSalary.value === "" ||
  empDate.value === ""
) {
  alert("املأ جميع الحقول");
  return;
}
  arrEmployees.push(employee);
  localStorage.setItem("ArrEmployees", JSON.stringify(arrEmployees));
  showDataEmployee();
  empName.value = "";
  empRole.value = "";
  empSalary.value = "";
  empDate.value = "";
});

function showDataEmployee() {
  tbodyEmployees.innerHTML = "";
  arrEmployees = JSON.parse(localStorage.getItem("ArrEmployees")) || [];
  arrEmployees.forEach((employee, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${employee.name}</td>
    <td>${employee.role}</td>
    <td>${employee.salary}</td>
    <td>${employee.date}</td>
    <td><button onclick="deleteEmployee(${index})" class="delete22">delete</button></td>
    `;
    tbodyEmployees.appendChild(tr);
  });
  dashTotalEmployeess.innerHTML = arrEmployees.length;
}
showDataEmployee();

function deleteEmployee(index) {
  if (confirm("هل تريد حذف هذا الموظف؟")) {
    arrEmployees.splice(index, 1);
    localStorage.setItem("ArrEmployees", JSON.stringify(arrEmployees));
    showDataEmployee();
  }
}

console.log(arrEmployees.length);
