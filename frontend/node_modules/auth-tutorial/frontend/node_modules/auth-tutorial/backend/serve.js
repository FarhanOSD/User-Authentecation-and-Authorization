import express from 'express';
import userRouth from "./routes/auth.routes.js"
import { ConnectToDatabase } from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT || 5000

app.get((req, res) => { 
  res.send("Hallow")
})
app.use(express.json());
app.use("/api/auth", userRouth)

app.listen(port, () => {
  ConnectToDatabase()
  console.log(`Code is running on http://localhost:${port} `)
})