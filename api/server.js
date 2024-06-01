const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const dbURI =
  "mongodb+srv://guruguru6631:mangopp@cluster0.nrzhyni.mongodb.net/Movie-app";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});