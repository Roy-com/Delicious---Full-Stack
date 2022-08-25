require("dotenv").config();
const express = require("express");
const cors = require("cors");
const gallery = require("./api/Gallery");
const registerUsers = require("./api/Signup");
const loginUsers = require("./api/Login");
const forgetpassword= require("./api/ForgetPassword")
const resetpassword = require("./api/ResetPassword")
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "token"],
    credentials: true,
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization,token"
//   );

//   next();
// });
//Middlewares: Connecting different Routes
app.use("/api/gallery", gallery);
app.use("/api", registerUsers);
app.use("/api", loginUsers);
app.use("/api", forgetpassword);
app.use("/api", resetpassword);
app.get("/", (req, res, err) => {
  res.status(500).send(err);
});

//Connect to the DataBase
connectDB();

//Listen to the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server running at port 5000");
  }
});
