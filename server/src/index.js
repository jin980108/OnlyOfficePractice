import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/pool.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW() AS now");
    res.json({ status: "ok", now: rows[0]?.now ?? null });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/usage-data", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM only_office");
    res.json(result.rows);
  } catch (error) {
    console.error("[usage-data] 조회 오류:", error);
    res.status(500).json({ error: "데이터 조회 실패" });
  }
});

app.get("/", (_req, res) => {
  res.json({ status: "서버 정상 작동중" });
});

const PORT = process.env.PORT || 4000;

console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
