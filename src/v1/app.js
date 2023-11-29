require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser= require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors");
const { connectDB, connectMGDB } = require("./model/db");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: "2mb" }));
app.use(helmet());

const PORT = process.env.APP_PORT || 4500;
app.set("port", PORT);

app.use("/user", userRouter);

app.listen(PORT, async () => {
  try {
    connectDB().then(() => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});
