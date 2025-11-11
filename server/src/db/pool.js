import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPaths = [
  path.resolve(__dirname, "../.env"),
  path.resolve(__dirname, "../../.env"),
];

envPaths.forEach((envPath, index) => {
  const result = dotenv.config({
    path: envPath,
    override: index === 0,
  });
  if (result.parsed) {
    console.log(`[DB] .env loaded: ${envPath}`);
  }
});

const { Pool } = pg;
const {
  DATABASE_URL,
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PGSSLMODE,
} = process.env;

console.log("[DB] connection config loaded:", {
  // viaUrl: Boolean(DATABASE_URL),
  host: PGHOST ?? "(env:PGHOST 미설정)",
  database: PGDATABASE ?? "(env:PGDATABASE 미설정)",
  user: PGUSER ?? "(env:PGUSER 미설정)",
  passwordSet: Boolean(
    PGPASSWORD || (DATABASE_URL && DATABASE_URL.includes("@"))
  ),
});

const buildSslOptions = () =>
  PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined;

const pool =
  DATABASE_URL && DATABASE_URL.trim().length > 0
    ? new Pool({
        connectionString: DATABASE_URL,
        ssl: buildSslOptions(),
      })
    : new Pool({
        host: PGHOST,
        port: PGPORT ? Number(PGPORT) : 5432,
        database: PGDATABASE,
        user: PGUSER,
        password: PGPASSWORD,
        ssl: buildSslOptions(),
      });

export default pool;
