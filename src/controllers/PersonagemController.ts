import { Request, Response } from "express";
import { Personagem } from "../models/Personagem";
import { connection } from "../config/database";

export class PersonagemController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const [rows] = await connection.query("SELECT * FROM personagem");
      return res.status(200).json(rows);
    } catch (error) {
      console.log("Erro ao listar personagens:", error);
      return res.status(500).json({ mensagem: "Erro ao listar personagens." });
    }
  }
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const [rows]: any = await connection.query(
        "SELECT * FROM personagem WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ mensagem: "Personagem não encontrado." });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.log("Erro ao buscar personagem:", error);
      return res.status(500).json({ mensagem: "Erro ao buscar personagem." });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, tipo, raca, arma, status } = req.body;
      await connection.query(
        "INSERT INTO personagem (nome, tipo, raca, arma, status) VALUES (?, ?, ?, ?, ?)",
        [nome, tipo, raca, arma, status]
      );
      return res
        .status(201)
        .json({ mensagem: "Personagem criado com sucesso!" });
    } catch (error) {
      console.log("Erro ao criar personagem:", error);
      return res.status(500).json({ mensagem: "Erro ao criar personagem." });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { nome, tipo, raca, arma, status } = req.body;
      await connection.query(
        "UPDATE personagem SET nome = ?, tipo = ?, raca = ?, arma = ?, status = ? WHERE id = ?",
        [nome, tipo, raca, arma, status, id]
      );
      return res.status(200).json({ mensagem: "Personagem atualizado!" });
    } catch (error) {
      console.log("Erro ao atualizar personagem:", error);
      return res
        .status(500)
        .json({ mensagem: "Erro ao atualizar personagem." });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await connection.query("DELETE FROM personagem WHERE id = ?", [id]);
      return res.status(204).send();
    } catch (error) {
      console.log("Erro ao deletar personagem:", error);
      return res.status(500).json({ mensagem: "Erro ao deletar personagem." });
    }
  }
}
