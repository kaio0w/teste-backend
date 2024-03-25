import { Request, Response } from 'express';
import CadastroModel from '../models/cadastroModel';


class CadastroController {
  static cadastrar(req: Request, res: Response) {
    CadastroModel.cadastrar(req.body, (error: string | null, message: string) => {
      if (error) {
        return res.status(400).send(error);
      }
      res.status(200).send(message);
    });
  }

  
  static listar(req: Request, res: Response) {
    CadastroModel.listar((error: any, dados: any) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res.status(200).json(dados);
    });
  }

  static atualizar(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const novosDados = req.body;

    CadastroModel.atualizar(id, novosDados, (error: any, mensagem: string) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res.status(200).json({ mensagem });
    });
  }

  static excluir(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    CadastroModel.excluir(id, (error: any, mensagem: string) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res.status(200).json({ mensagem });
    });
  }

}

export default CadastroController;
