const nome_user = document.querySelector('#nome')
const senha = document.querySelector('#senha')
const btn = document.querySelector('#entrar')
btn.addEventListener('click', async () => {
    let dados={
        user:nome_user.value,
        password:senha.value
    }
    const resposta = await fetch('http://localhost:3000/login', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados)
    })
    const objeto = await resposta.json();  
    if(resposta.status==200){
        alert('Seja bem vindo')
        localStorage.setItem('id', objeto.id_usuario)
        localStorage.setItem('nome', objeto.nome_usuario)
        return window.location.href='../Home/index.html'
    }
    alert('Erro ao logar')
})