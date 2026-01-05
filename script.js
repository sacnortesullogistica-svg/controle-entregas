// 🔒 BLOQUEIO DE LOGIN
if (localStorage.getItem('logado') !== 'true') {
  window.location.href = "login.html";
}

// USUÁRIO LOGADO
const usuario = localStorage.getItem('usuarioLogado');
document.getElementById('usuarioLogado').textContent = "Usuário: " + usuario;

// TEMA
if (localStorage.getItem('tema') === 'dark') {
  document.body.classList.add('dark');
}

function alternarTema() {
  document.body.classList.toggle('dark');
  localStorage.setItem('tema',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// MOTORISTAS
const listaMotoristas = [
  "Antonio Helder",
  "Antonio Vieira",
  "Hilberto",
  "Fiderlan",
  "Galpão",
  "Gedimar",
  "Genes",
  "Kenderson",
  "Sidinei",
  "Welder"
];

let entregas = JSON.parse(localStorage.getItem('entregas')) || [];

const form = document.getElementById('entregaForm');
const tabela = document.getElementById('tabela');
const filtroStatus = document.getElementById('filtroStatus');
const selectMotorista = document.getElementById('motorista');
const editIndex = document.getElementById('editIndex');

const data = document.getElementById('data');
const remetente = document.getElementById('remetente');
const destinatario = document.getElementById('destinatario');
const volumes = document.getElementById('volumes');
const nota = document.getElementById('nota');
const status = document.getElementById('status');

function carregarMotoristas() {
  selectMotorista.innerHTML = '<option value="">Motorista</option>';
  listaMotoristas.forEach(m => {
    selectMotorista.innerHTML += `<option>${m}</option>`;
  });
}

function salvar() {
  localStorage.setItem('entregas', JSON.stringify(entregas));
}

function renderizar() {
  tabela.innerHTML = '';
  const filtro = filtroStatus.value;

  entregas.forEach((e, i) => {
    if (filtro !== 'todos' && e.status !== filtro) return;

    tabela.innerHTML += `
      <tr>
        <td>${e.motorista}</td>
        <td>${e.data}</td>
        <td>${e.remetente}</td>
        <td>${e.destinatario}</td>
        <td>${e.volumes}</td>
        <td>${e.nota}</td>
        <td class="status-${e.status}">${e.status}</td>
        <td>
          <button onclick="editar(${i})">✏️</button>
          <button onclick="excluir(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const entrega = {
    motorista: selectMotorista.value,
    data: data.value,
    remetente: remetente.value,
    destinatario: destinatario.value,
    volumes: volumes.value,
    nota: nota.value,
    status: status.value
  };

  if (editIndex.value === '') {
    entregas.push(entrega);
  } else {
    entregas[Number(editIndex.value)] = entrega;
    editIndex.value = '';
  }

  salvar();
  form.reset();
  renderizar();
});

function editar(i) {
  const e = entregas[i];
  selectMotorista.value = e.motorista;
  data.value = e.data;
  remetente.value = e.remetente;
  destinatario.value = e.destinatario;
  volumes.value = e.volumes;
  nota.value = e.nota;
  status.value = e.status;
  editIndex.value = i;
}

function excluir(i) {
  if (confirm("Excluir entrega?")) {
    entregas.splice(i, 1);
    salvar();
    renderizar();
  }
}

filtroStatus.addEventListener('change', renderizar);

carregarMotoristas();
renderizar();


