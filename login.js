const form = document.getElementById('loginForm');
const erro = document.getElementById('erro');

// 🔐 USUÁRIOS
const usuarios = [
  { usuario: "MARINA", senha: "2020" },
  { usuario: "JOAO", senha: "2021" },
  { usuario: "ANDRE", senha: "2022" }
];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const u = usuario.value;
  const s = senha.value;

  const valido = usuarios.find(x => x.usuario === u && x.senha === s);

  if (valido) {
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuarioLogado', u);
    window.location.href = "index.html";
  } else {
    erro.textContent = "Usuário ou senha inválidos";
  }
});
