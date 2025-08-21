import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { ENV } from "./config/env";
import api from "./routes";

const app = express();

// Middlewares base
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// Rutas
app.use("/api", api);

// Raíz
app.get("/", (_req, res) => {
  res.send("FakeArt API running. See /api/health");
});

app.listen(Number(ENV.PORT), () => {
  console.log(`✅ FakeArt backend on http://localhost:${ENV.PORT}`);
});
