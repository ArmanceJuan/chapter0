import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/router";
import { db, users } from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", router);

(async () => {
  try {
    await db.select().from(users).limit(1);
    console.log("✅ Base de données connectée !");
  } catch (err) {
    console.error("❌ Erreur de connexion à la base de données :", err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
