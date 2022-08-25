// const response = await fetch("https://reqbin.com/echo/post/json", {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: `{
//      "Id": 78912,
//      "Customer": "Jason Sweet",
//      "Quantity": 1,
//      "Price": 18.00
//     }`,
//   });

//   response.json().then(data => {
//     console.log(data);
//   });
const token=localStorage.getItem("token");

// if(!token){
//   window.location.href = "./Ligin.html";
// }
console.log(token)
// GalleryHeading
var headingInputValue = document.getElementById("headingInput").value;
var headingSpaninputValue = document.getElementById("headingSpaninput").value;
var headingParainput = document.getElementById("headingParainput").value;

const dataHeadingObject = {
  heading: `${headingInputValue}`,
  headingSpan: `${headingSpaninputValue}`,
  headingPara: `${headingParainput}`,
};
fetch("http://localhost:5000/api/gallery/allGalleryHeading", {
  headers: {
    "Content-Type": "application/json",
  
  },
 
})
  .then((res) => res.json())
  .then((res) => {
    document.getElementById("headingInput").value = res[0].heading;
    document.getElementById("headingSpaninput").value = res[0].headingSpan;
    document.getElementById("headingParainput").value = res[0].headingPara;
  });
// Click Update Button
let UpdateButtonOfHeading = document.getElementById("UpdateButtonOfHeading");
UpdateButtonOfHeading.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you sure to update this record ?")) {
    let headinResData;
    var headingInputValue = document.getElementById("headingInput").value;
    var headingSpaninputValue =
      document.getElementById("headingSpaninput").value;
    var headingParainput = document.getElementById("headingParainput").value;

    const dataHeadingObject = {
      heading: `${headingInputValue}`,
      headingSpan: `${headingSpaninputValue}`,
      headingPara: `${headingParainput}`,
    };

    fetch(
      "http://localhost:5000/api/gallery/updateGalleryHeading/62b462e4a4c6e364ca3a527c",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": `Bearer ${token}`,
        },
        body: JSON.stringify(dataHeadingObject),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // this is the data we get after putting our data,
        console.log("cool")
      );
  }
});

// ImageUrlInput
fetch("http://localhost:5000/api/gallery/allGalleryImg", {
  // method: "get",
  headers: {
    "Content-Type": "application/json",
    
  },
  
})
  .then((res) => res.json())
  .then((res) => {
    // console.log(res);
    let ImageUrlResData = res;
    // console.log(ImageUrlResData.length);
    for (let i = 0; i < ImageUrlResData.length; ++i) {
      var empTable = document.querySelector(".list");
      var emp_tr = empTable.insertRow(empTable.length);
      var emp_td1 = emp_tr.insertCell(0);

      var emp_td2 = emp_tr.insertCell(1);
      var emp_td3 = emp_tr.insertCell(2);
      var totalRowCount = document.querySelector(".list tr").length;
      emp_td1.innerHTML = empTable.rows.length - 1;
      //Note:- .rows.length = return no of row

      emp_td2.innerHTML = ImageUrlResData[i].galleryImageurl;

      emp_td3.innerHTML = `<a class="edt" id="${ImageUrlResData[i]._id}" onClick="onEdit(this)">Update</a>  / <a class="dlt"  id="${ImageUrlResData[i]._id}"  onClick="onDelete(this)">Delete</a>`;
    }
  })
  .catch((err) => console.log(err));
var selectedRow = null;
var btn = document.querySelector(".AddButtonOfImageUrl");
btn.addEventListener("click", employdata);

function employdata() {
  var ax = read_Input_Value();
  console.log("x");
  if (selectedRow == null) {
    create_Tr_Td(ax);
    remove_input_value();
  } else {
    updatefunc(ax);
    remove_input_value();
    selectedRow = null;
  }
}

function read_Input_Value() {
  var redemp = {};
  redemp["ename"] = document.querySelector(".ImageUrlInput").value;

  return redemp;
}
function create_Tr_Td(x) {
  var empTable = document.querySelector(".list");
  var emp_tr = empTable.insertRow(empTable.length);
  var emp_td1 = emp_tr.insertCell(0);

  var emp_td2 = emp_tr.insertCell(1);
  var emp_td3 = emp_tr.insertCell(2);
  var totalRowCount = document.querySelector(".list tr").length;
  emp_td1.innerHTML = empTable.rows.length - 1;
  console.log(empTable.rows.length - 1);
  //Note:- .rows.length = return no of row

  emp_td2.innerHTML = x.ename;
  console.log(x.ename);
  emp_td3.innerHTML =
    '<a class="edt" onClick="onEdit(this)">Update</a>  / <a class="dlt" onClick="onDelete(this)">Delete</a>';
  const dataImageUrlObject = {
    galleryImageurl: `${x.ename}`,
  };
  fetch("http://localhost:5000/api/gallery/addGalleryImg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": `Bearer ${token}`,
    },
    body: JSON.stringify(dataImageUrlObject),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) =>
      // console.log(data)
      // this is the data we get after putting our data,
      console.log(data)
    );
}

function remove_input_value() {
  document.querySelector(".ImageUrlInput").value = " ";
}
let IdOfUpdatedElemet;
function onEdit(y) {
  IdOfUpdatedElemet = y.parentElement.querySelector(".edt").id;
  selectedRow = y.parentElement.parentElement;
  document.querySelector(".ImageUrlInput").value =
    selectedRow.cells[1].innerHTML;

  btn.innerHTML = "Update";
}

function updatefunc(redemp) {
  if (confirm("Are you sure to update this record ?")) {
    selectedRow.cells[1].innerHTML = redemp.ename;
    btn.innerHTML = "Add";
    const dataImageUrlObjectUpdated = {
      galleryImageurl: `${redemp.ename}`,
    };
    fetch(
      `http://localhost:5000/api/gallery/updateGalleryImg/${IdOfUpdatedElemet}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": `Bearer ${token}`,
        },
        body: JSON.stringify(dataImageUrlObjectUpdated),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // this is the data we get after putting our data,
        console.log("cool")
      );
  }
}

function onDelete(y) {
  var IdOfDeletedUrl = "a";
  async function fetch_details() {
    IdOfDeletedUrl = y.parentElement.querySelector(".dlt").id;
  }
  if (confirm("Are you sure to delete this record ?")) {
    // let IdOfDeletedUrl = y.parentElement.querySelector(".dlt").id;
    // console.log(IdOfDeletedUrl);
    y.parentElement.parentElement.remove();

    // let IdOfDeletedUrl = y.parentElement.querySelector(".dlt").id;
    // console.log(IdOfDeletedUrl)

    fetch_details().then(function () {
      console.log(IdOfDeletedUrl);
      if (IdOfDeletedUrl == null) {
        console.log("yes");
      } else {
        console.log("No");
      }
      // further processing and use of data
      const deleteData = async () => {
        console.log(IdOfDeletedUrl);
        const response = await fetch(
          `http://localhost:5000/api/gallery/delGalleryImg/${IdOfDeletedUrl}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "token": `Bearer ${token}`,
            },
            body: null,
          }
        );

        // const data = await response.json();

        // // now do whatever you want with the data
        // console.log(data);
      };
      deleteData();
    });
  }
}
