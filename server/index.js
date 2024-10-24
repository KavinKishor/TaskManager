const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRouter = require("./Routers/userRouter");
const taskRouter = require("./Routers/taskRouter");

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`port is connected on ${process.env.PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB not connected");
  });
const allowedOrigins = [
  "https://taskmanager-1-526y.onrender.com",
  "https://another-allowed-origin.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/task", taskRouter);
