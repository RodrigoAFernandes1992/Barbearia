import express from "express";
import sql from "./database.js";
const routes = express.Router();

//USUÁRIO usando MD5
routes.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    const resposta =
      await sql`select * from usuarios where nome_usuario = ${user} and senha = md5(${password});`;
    if (resposta.length != 0) {
      return res.status(200).json(resposta[0]);
    }
    return res.status(401).json("erro ao logar");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});
routes.post("/cadUsuario", async (req, res) => {
  try {
    const { user, password } = req.body;
    await sql`insert into usuarios(nome_usuario, senha) values
    (${user},md5(${password}))`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});

routes.post("/cadServico", async (req, res) => {
  try {
    const { nome_servico, valor } = req.body;
    await sql`insert into servico(nome_servico, valor)values 
    (${nome_servico},${valor})`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});
//cadastrar cliente novo
routes.post("/cadCliente", async (req, res) => {
  try {
    const { cliente, cpf } = req.body;
    await sql`insert into clientes(nome_cliente, cpf) values 
    (${cliente},md5(${cpf}))`;
    return res.status(201).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});

//cadastrar agendamento
routes.post("/cadAgendamento", async (req, res) => {
  try {
    const { data_agendamento, servico_id, cliente_id } = req.body;
    await sql`insert into agendamento(data_agendamento, servico_id, cliente_id)values
    (${data_agendamento},${servico_id},${cliente_id} )`;
    return res.status(201).json("Agendado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro interno ao cadastrar usuário",
    });
  }
});
routes.put("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_agendamento } = req.body;
    const resposta =
      await sql`update agendamento set data_agendamento = ${data_agendamento} where id_agendamento=${id}`;
    return res.status(201).json("atualizado");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});
routes.delete("/deletar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const resposta = await sql`delete from agendamento where id_agendamento=${id}`;
    return res.status(204).json("Excluído");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar produto" });
  }
});
//rota com consulta
routes.get("/agendamentos", async (req, res) => {
  const { search } = req.query;
  let rows;
  if (search) {
    rows = await sql`
        select * from clientes as  c inner join agendamento as a on a.cliente_id = c.id_cliente
        WHERE c.nome_cliente ILIKE ${"%" + search + "%"}`;
  } else {
    rows = await sql`
    select * from clientes as  c inner join agendamento as a on a.cliente_id = c.id_cliente;
      `;
  }
  return res.status(200).json(rows);
});
routes.get("/preenchimento", async (req, res) => {
  let rows = await sql`
    select * from clientes as  c full outer join servico as a on a.id_servico = c.id_cliente;
      `;
  return res.status(200).json(rows);
});

routes.get('/agendamentos/:id', async (req,res) => {
  const {id}= req.params;
  const resposta = await sql `select * from agendamento where id_agendamento=${id}`
   return res.status(200).json(resposta[0]);
})

routes.get("/usuarios", async (req, res) => {
  const resposta = await sql`select * from usuarios`;
  return res.status(200).json(resposta);
});

export default routes;
