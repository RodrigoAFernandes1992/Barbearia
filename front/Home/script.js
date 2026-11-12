const nome_dono = localStorage.getItem("nome");
const btn_logout = document.querySelector("#logout");
document.querySelector("h2").innerText = nome_dono;
const form_cliente = document.querySelector("#cad_cliente");
const form_servico = document.querySelector("#cad_servico");
const form_agendamento = document.querySelector("#cad_agendamento");
const nome_cliente = document.querySelector("#nome_cliente");
const nome_servico = document.querySelector("#nome_servico");
const cpf_cliente = document.querySelector("#cpf_cliente");
const valor_servico = document.querySelector("#valor_servico");
const data_agendamento = document.querySelector("#data_agendamento");
const select_servico = document.querySelector("#id_servico");
const select_cliente = document.querySelector("#id_cliente");
const vazia = document.querySelector("#vazia");
const buscar = document.querySelector("#buscar");
const procurar = document.querySelector("#procurar");

window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/preenchimento");
  const lista = await resposta.json();
  const resposta_agenda = await fetch("http://localhost:3000/agendamentos");
  const lista_agenda = await resposta_agenda.json();
  if (resposta_agenda.status == 200) {
    lista_agenda.forEach((element) => {
      vazia.innerHTML += `
            <div class='card'>
            <p>${element.nome_cliente}</p>
            <p>${element.data_agendamento.slice(0, 16)}</p>
            <button class="deletar" onclick="deletar(${element.id_agendamento})">Deletar</button>
            <button class="editar" onclick="editar(${element.id_agendamento})">Editar</button>
            </div>
            `;
    });
  }
  if (resposta.status == 200) {
    select_cliente.innerHTML = "";
    select_servico.innerHTML = "";
    lista.forEach((element) => {
      select_cliente.innerHTML += `
                <option value="${element.id_cliente}">${element.nome_cliente}</option>
            `;
      select_servico.innerHTML += `
                <option value="${element.id_servico}">${element.nome_servico}</option>
            `;
    });
  }
});

form_cliente.addEventListener("submit", async (event) => {
  event.preventDefault();
  let dados = {
    cliente: nome_cliente.value,
    cpf: cpf_cliente.value,
  };
  const resposta = await fetch("http://localhost:3000/cadCliente", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (resposta.status == 201) {
    alert("Cadastro realizado com sucesso");
    return window.location.reload();
  }
  alert("Cadastro não realizado");
});
form_servico.addEventListener("submit", async (event) => {
  event.preventDefault();
  let dados = {
    nome_servico: nome_servico.value,
    valor: valor_servico.value,
  };
  const resposta = await fetch("http://localhost:3000/cadServico", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (resposta.status == 201) {
    alert("Cadastro realizado com sucesso");
    return window.location.reload();
  }
  alert("Cadastro não realizado");
});
form_agendamento.addEventListener("submit", async (event) => {
  event.preventDefault();
  let dados = {
    data_agendamento: data_agendamento.value,
    servico_id: select_servico.value,
    cliente_id: select_cliente.value,
  };
  const resposta = await fetch("http://localhost:3000/cadAgendamento", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (resposta.status == 201) {
    alert("Cadastro realizado com sucesso");
    return window.location.reload();
  }
  alert("Cadastro não realizado");
});
btn_logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../Login/index.html");
});
buscar.addEventListener("click", async () => {
  if (procurar.value == "") return alert("Digite um valor");
  let texto = procurar.value;
  const resposta = await fetch(
    `http://localhost:3000/agendamentos?search=${texto}`,
  );
  const lista = await resposta.json();
  vazia.innerHTML = "";
  if (resposta.status == 200) {
    lista.forEach((element) => {
      vazia.innerHTML += `
            <div class='card'>
            <p>${element.nome_cliente}</p>
            <p>${element.data_agendamento.slice(0, 16)}</p>
            </div>
            `;
    });
  }
});

async function deletar(id) {
  console.log(id);
  const resposta = await fetch(`http://localhost:3000/deletar/${id}`, {
    method: "delete",
  });
  if (resposta.status == 204) {
    alert("agendamento deletado");
    return window.location.reload();
  }
  alert("Erro ao deletar agendamento");
}

async function editar(id) {
  const respota = await fetch(`http://localhost:3000/agendamentos/${id}`);
  const lista = await respota.json();
  let dados = {
    data_agendamento: prompt('Data do Agendamento', lista.data_agendamento),
  };
  const resposta = await fetch(`http://localhost:3000/editar/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if(resposta.status==201){
    alert('editado com sucesso')
    return window.location.reload()
  }
  alert('erro ao editar')
}
