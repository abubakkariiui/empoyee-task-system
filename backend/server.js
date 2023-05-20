import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors'
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";

dotenv.config();

connectDB();

const app = express(); // main thing
app.use(cors())
app.use(express.json()); // to accept json data

app.use("/api/employee", employeeRoutes);
app.use("/api/task", taskRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}..`.yellow
      .bold
  )
);
