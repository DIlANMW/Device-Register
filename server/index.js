// app.js
import express from "express";
import cors from "cors";
import deviceController from "./controllers/deviceController.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

app.use("/", deviceController);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
