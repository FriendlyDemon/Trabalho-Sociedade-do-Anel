import { Router } from "express";
import { PersonagemController } from "../controllers/PersonagemController";
import { Request, Response, NextFunction } from "express";
import { connection } from "../config/database";

const ponte = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    const { id } = req.params;
    const [query]: any[] = await connection.query(
      "SELECT * FROM personagem WHERE id = ?",
      [id]
    );
    console.log(query[0].tipo);

    if (query.length > 0) {
      switch (query[0].tipo) {
        case "Sociedade":
          console.log("Corram seus tolos!");
          break;
        case "Nazgûl":
          console.log("Os Nazgûl não estão em Moria.");
          break;
        case "Balrog":
          console.log("Você não vai passar!");
          break;
        default:
          console.log("tipo " + query[0].tipo + " não reconhecido.");
          break;
      }
    }
  }
  next();
};

const router = Router();

const controller = new PersonagemController();

router.get("/personagens", controller.list);
router.get("/personagens/:id", ponte, controller.getById);
router.post("/personagens", controller.create);
router.put("/personagens/:id", controller.update);
router.delete("/personagens/:id", controller.delete);

export default router;
