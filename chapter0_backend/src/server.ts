import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/router";
import { db, users } from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://f974-2a01-cb1c-e42-d300-11c5-2605-987f-5c60.ngrok-free.app",
  "https://9821-2001-861-4446-6670-8c9d-4b08-ed34-53fa.ngrok-free.app",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Not allowed by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

console.log("✅ API routes mounted at /api");
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
