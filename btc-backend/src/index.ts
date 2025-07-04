import express from "express";
import { initializeDatabase } from "./config/database";
import btcDailyPriceRoutes from "./presentation/routes/btcDailyPrice-routes";
import { SyncBtcDailyPriceJob } from "./jobs/sync-BtcDailyPrice-job";
import btcRealtimePriceRoutes from "./presentation/routes/BtcRealtimePrice-Routes";

const app = express();
app.use(express.json());

// Inicializar o job de sincronização
const syncJob = new SyncBtcDailyPriceJob();
syncJob.start();

// Define rotas
app.use("/api/btc-daily-price", btcDailyPriceRoutes);
app.use("/api/realtime-price", btcRealtimePriceRoutes);

// Middleware de erro global
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
);

// Inicia o servidor
async function startServer() {
  await initializeDatabase();
  app.listen(3000, () => console.log("Server running on port 3000"));
}

startServer();
