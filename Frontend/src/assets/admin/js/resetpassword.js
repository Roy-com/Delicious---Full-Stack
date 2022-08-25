let ResetButton = document.getElementById("ResetButton");
let userIdForResetPassword=localStorage.getItem("userIdForResetPassword");
let tokenForResetPassword=localStorage.getItem("tokenForResetPassword")
ResetButton.addEventListener("click",function(e){
e.preventDefault()
let password = document.getElementById("Resetpassword").value;
fetch(`http://localhost:5000/api/reset-password/${userIdForResetPassword}/${tokenForResetPassword}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status == "ok") {
       
        document.getElementById("Resetpassword").value = "";
       
       localStorage.removeItem("userIdForResetPassword")
       localStorage.removeItem("tokenForResetPassword")
        window.location.href = "./Login.html";
      } else {
       
        alert(data.error);
      }
    });
});