const express = require("express");
const app = express();
app.get("/api/data", (req, res) => {
  res.status(200).json({
    message: "hello! This is GET API.",
    data: ["Apple", "Banana", "Mango"],
  });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});