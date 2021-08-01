const express = require("express");
const mongoose = require("mongoose");

//import routes
const users = require("./routes/users.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database configuration
const db = require("./keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB database connected"))
  .catch(() => console.log("MongoDB connection failed"));

//routes
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
