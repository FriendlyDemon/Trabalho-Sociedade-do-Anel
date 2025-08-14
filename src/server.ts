import express, { Application, Request, Response, NextFunction } from "express";
import personagemRota from "./routes/PersonagemRoutes";
import { connection } from "./config/database";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    (req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE") &&
    (req.body.tipo == "Nazgûl" || req.query.tipo == "Nazgûl")
  ) {
    console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
  }
  next();
});


app.use(personagemRota);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    erro: "A passagem de Caradhras está fechada por Saruman. Esta rota não existe para nós. Só nos sobrou...Moria.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
