import express from "express";
import cors from "cors";
import playersRouter from "./routes/players.ts";
import shipsRouter from "./routes/ships.ts";
import planetsRouter from "./routes/planets.ts";
import agentsRouter from "./routes/agents.ts";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(playersRouter);
app.use(shipsRouter);
app.use(planetsRouter);
app.use(agentsRouter);

export default app;