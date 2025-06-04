import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const startServer = () => {
  const app = express();
  app.use(express.json());

  //Route

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
};
