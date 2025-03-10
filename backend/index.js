const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/UserRoutes"));

app.listen(5000, () => console.log("Server started on port 5000"));
mongoose
  .connect(
    "mongodb+srv://kanishkDev:rpafAzM60tQOJT94@kanishkdev.aworo.mongodb.net/devMovie",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));
