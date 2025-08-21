import { Router } from "express";
import health from "./health.routes";

const api = Router();
api.use("/health", health);

// Aquí luego: api.use("/uploads", uploads); api.use("/posts", posts); etc.
export default api;
