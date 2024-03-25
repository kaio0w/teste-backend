import mysql, { MysqlError, FieldInfo } from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE
});

class CadastroModel {
  static cadastrar(dados: any, callback: Function) {
    const { tipoPessoa, cpf, cnpj, nome, celular, telefone, email, confirmarEmail, cep, logradouro, numero, complemento, cidade, bairro, estado, termos } = dados;

  
    if (!tipoPessoa || !cpf || !nome || !celular || !email || !confirmarEmail || !cep || !logradouro || !numero || !cidade || !bairro || !estado || !termos) {
      return callback('Por favor, preencha todos os campos obrigatórios.');
    }

    if (email !== confirmarEmail) {
      return callback('Os campos de email e confirmar email devem ser iguais.');
    }

    const query = `INSERT INTO cadastros (tipo_pessoa, cpf, cnpj, nome, celular, telefone, email, cep, logradouro, numero, complemento, cidade, bairro, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [tipoPessoa, cpf, cnpj, nome, celular, telefone, email, cep, logradouro, numero, complemento, cidade, bairro, estado], (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
      if (error) {
        console.error('Erro ao inserir dados no banco de dados:', error);
        return callback('Erro interno do servidor ao processar o cadastro.');
      }
      console.log('Dados inseridos com sucesso no banco de dados');
      callback(null, 'Cadastro realizado com sucesso!');
    });
  }

  static listar(callback: Function) {
    const query = `SELECT * FROM cadastros`;
    connection.query(query, (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
      if (error) {
        console.error('Erro ao recuperar dados do banco de dados:', error);
        return callback('Erro interno do servidor ao recuperar dados.');
      }
      console.log('Dados recuperados com sucesso do banco de dados');
      callback(null, results);
    });
}
static atualizar(id: number, novosDados: any, callback: Function) {
  const query = `UPDATE cadastros SET ? WHERE id = ?`;
  connection.query(query, [novosDados, id], (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
    if (error) {
      console.error('Erro ao atualizar dados no banco de dados:', error);
      return callback('Erro interno do servidor ao atualizar dados.');
    }
    console.log('Dados atualizados com sucesso no banco de dados');
    callback(null, 'Registro atualizado com sucesso!');
  });
}

static excluir(id: number, callback: Function) {
  const query = `DELETE FROM cadastros WHERE id = ?`;
  connection.query(query, [id], (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => {
    if (error) {
      console.error('Erro ao excluir dados do banco de dados:', error);
      return callback('Erro interno do servidor ao excluir dados.');
    }
    console.log('Registro excluído com sucesso do banco de dados');
    callback(null, 'Registro excluído com sucesso!');
  });
}


}

export default CadastroModel;
