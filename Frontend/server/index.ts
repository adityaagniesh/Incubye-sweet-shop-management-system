import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetSweets,
  handleGetSweet,
  handleCreateSweet,
  handleUpdateSweet,
  handleDeleteSweet,
  handleRestockSweet,
} from "./routes/sweets";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Sweets API routes
  app.get("/api/sweets", handleGetSweets);
  app.get("/api/sweets/:id", handleGetSweet);
  app.post("/api/sweets", handleCreateSweet);
  app.put("/api/sweets/:id", handleUpdateSweet);
  app.delete("/api/sweets/:id", handleDeleteSweet);
  app.post("/api/sweets/:id/restock", handleRestockSweet);

  return app;
}
