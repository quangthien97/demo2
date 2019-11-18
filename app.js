var createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cateNewsRouter = require("./routes/cateNews");
const newsRouter = require("./routes/news");
const loginRouter = require("./routes/login");
const newsEditRouter = require("./routes/newsEdit");
const likeRouter = require("./routes/like");
const rateRouter = require("./routes/rate");
const userRouter = require("./routes/users");
const viewRouter = require("./routes/view");
const draftRouter = require("./routes/draft");
const mongoose = require("mongoose");
const schedule = require("./service/schedule");
// const dotenv = require("dotenv");
// dotenv.config();

// let urlData = process.env.DATABASE_URL;
// const connetMongoDB = async () => {
//   try {
//     await mongoose.connect(urlData, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true
//     });
//     console.log("connect successful ! ");
//   } catch (error) {
//     console.error("connect MongoDb has error: " + error);
//   }
// };

const connetMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/finnal", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connect successful ! ");
  } catch (error) {
    console.error("connect MongoDb has error: " + error);
  }
};

connetMongoDB();

const app = express();
app.use(cookieParser());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

schedule.view();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/")));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Cache-Control, Pragma, Origin, Authorization, access-token, Access-Control-Allow-Headers,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  return next();
});

app.use("/cateNews", cateNewsRouter);
app.use("/news", newsRouter);
app.use("/newsEdits", newsEditRouter);
app.use("/login", loginRouter);
app.use("/draft", draftRouter);
app.use("/users", userRouter);
app.use("/likes", likeRouter);
app.use("/rates", rateRouter);
app.use("/views", viewRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8000, () => {
  console.log("Connected to server at port 8000");
});
