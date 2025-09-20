import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is Running!");
});

app.listen(PORT, () => {
  `Server started on port ${port}`;
});
