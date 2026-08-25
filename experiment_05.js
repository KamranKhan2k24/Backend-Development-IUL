const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/practical5")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Connecting Error:", err));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model("User", userSchema);

app.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User Created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/read", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.put("/update/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "User Updated", updated });
});
app.delete("/delete/:id", async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted", deleted });
});
app.listen(3000, () => console.log("Server running at http://localhost:3000"));