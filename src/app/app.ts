import express, { Application } from "express";
import cors from "cors";
import { dbConnect } from "./utils/dbConnect";

const app: Application = express();

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connect
dbConnect();

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
