import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import CadastroController from '../controllers/cadastroController';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/cadastros', CadastroController.cadastrar);


app.get('/cadastros', CadastroController.listar);


app.put('/cadastros/:id', CadastroController.atualizar);


app.delete('/cadastros/:id', CadastroController.excluir);


app.get('/', (req: Request, res: Response) => {
  res.send('Servidor CRUD está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
