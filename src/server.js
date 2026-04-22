const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

console.log("ROUTES CHECK:", productRoutes);

app.use("/api", productRoutes);

app.listen(3000, () => {
  console.log("🚀 API running on http://localhost:3000");
});