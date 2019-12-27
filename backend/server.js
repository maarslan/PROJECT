const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");

const app = express();
// Socket.io setup
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const dbConfig = require("./config/secret");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Database Connection
mongoose.connect(
  dbConfig.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (!err) {
      console.log("connected to db..");
    } else {
      console.log(err);
    }
  }
);
require("./socket/menu-settings")(io);

// routes requireing
const auth = require("./routes/authRoutes");
const menu = require("./routes/menuRoutes");
const company = require("./routes/companyRoutes");
const user = require("./routes/userRoutes");

// models use
app.use("/api/garsonn", auth);
app.use("/api/garsonn", menu);
app.use("/api/garsonn", company);
app.use("/api/garsonn", user);

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
