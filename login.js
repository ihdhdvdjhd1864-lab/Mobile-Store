let SECRET_ID = "1001";
let SECRET_CODE = "kimo2008";
let loginForm = document.querySelector("form");
let userIdInput = document.getElementById("adminId");
let userCodeInput = document.getElementById("adminCode");
let errorMsg1 = document.getElementById("errorMsg");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // منع إعادة تحميل الصفحة
  let enteredId = userIdInput.value.trim();
  let enteredCode = userCodeInput.value.trim();
  // التحقق من صحة البيانات
  if (enteredId === SECRET_ID && enteredCode === SECRET_CODE) {
    sessionStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Please Enter Valid Data");
  }
});
