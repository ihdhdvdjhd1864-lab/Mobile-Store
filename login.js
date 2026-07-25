const SECRET_ID = "1001";
const SECRET_CODE = "medstar2026";
const loginForm = document.querySelector("form");
const userIdInput = document.getElementById("adminId");
const userCodeInput = document.getElementById("adminCode");
const errorMsg1 = document.getElementById("errorMsg");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // منع إعادة تحميل الصفحة
  const enteredId = userIdInput.value.trim();
  const enteredCode = userCodeInput.value.trim();
  // التحقق من صحة البيانات
  if (enteredId === SECRET_ID && enteredCode === SECRET_CODE) {
    // 1. حفظ حالة التسجيل في sessionStorage لو حابب تتأكد إنه مسجل قبل الدخول
    sessionStorage.setItem("isLoggedIn", "true");
    // 2. تحويل المستخدم للصفحة الرئيسية
    window.location.href = "index.html"; 
  } 
});