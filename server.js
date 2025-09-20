import express from "express";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import { readFile } from "fs/promises";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const raw = await readFile("./docs/apidoc.json", "utf-8");
// const swaggerDocument = JSON.parse(raw);
//
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API is Running!");
});

app.listen(PORT, () => {
  `Server started on port ${port}`;
});
