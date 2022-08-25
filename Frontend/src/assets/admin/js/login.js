let LoginButton = document.getElementById("LoginButton");
LoginButton.addEventListener("click", function (e) {
  e.preventDefault();
  let email = document.getElementById("LoginEmail").value;
  let password = document.getElementById("LoginPassword").value;
  // let token = localStorage.getItem("authToken");
  // if (!localStorage.getItem("authToken")) {
  //   window.location.href("./Signup.html");
  // }
  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status == "ok") {
        document.getElementById("LoginEmail").value = "";
        document.getElementById("LoginPassword").value = "";
        localStorage.setItem("token", data.token);
       
        window.location.href = "./DashBoard.html";
      } else {
        localStorage.removeItem("token");
        alert(data.error);
      }
    });
});
