let EmailverificationButton= document.getElementById("EmailverificationButton")
EmailverificationButton.addEventListener("click",function(e){
    e.preventDefault();
    let email = document.getElementById("emailverification").value;
    fetch(`http://localhost:5000/api/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        
          email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
           localStorage.setItem("userIdForResetPassword",data.userId)
           localStorage.setItem("tokenForResetPassword",data.forgetToken)
            document.getElementById("emailverification").value = "";
           
           document.getElementById("afteremailsent").innerHTML=`Email has sent to your mail`
          
          } else {
           
            alert(data.error);
          }
        });
    });