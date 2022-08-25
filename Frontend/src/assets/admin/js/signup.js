let RegisterButton = document.getElementById("RegisterButton");

RegisterButton.addEventListener("click", function (e) {
  e.preventDefault();
  let name = document.getElementById("RegisterName").value;
  let email = document.getElementById("RegisterEmail").value;
  let password = document.getElementById("RegisterPassword").value;
  let repassword = document.getElementById("RegisterrePassword").value;

  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      repassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data, "userRegister");
      // console.log(data.token);
      if (data.status == "ok") {
        localStorage.setItem("authToken", data.token);
        document.getElementById("RegisterName").value = "";
        document.getElementById("RegisterEmail").value = "";
        document.getElementById("RegisterPassword").value = "";
        document.getElementById("RegisterrePassword").value = "";

        alert("Register successful");
        // window.localStorage.setItem("token", data.data);
        window.location.href = "./login.html";
      } else {
        alert(data.error);
      }
    });
});
