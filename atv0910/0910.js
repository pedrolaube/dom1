
const formulario = document.querySelector("#sorteadorForm");
const entrada = document.querySelector("#listaEntrada");
const botaoLimpar = document.querySelector("#btnLimpar");
const status = document.querySelector("#status");
const resultadoBox = document.querySelector("#resultadoBox");
const resultado = document.querySelector("#resultado");

const roleta = document.querySelector("#roletaVisual");
const botaoGirar = document.querySelector("#btnGirar");
const resultadoRoleta = document.querySelector("#resultadoRoleta");

const cores = [
  "#7c3aed",
  "#f59e0b",
  "#0891b2",
  "#db2777",
  "#16a34a",
  "#ea580c",
  "#4f46e5",
  "#475569"
];

let anguloAtual = 0;
let girando = false;

// CONJUNTO 1: Ler os nomes digitados
function obterItens() {
  return entrada.value
    .split(/[,\n]/)
    .map(item => item.trim())
    .filter(item => item !== "");
}

// CONJUNTO 2: Criar as fatias da roleta
function montarRoleta() {
  const itens = obterItens();

  roleta.innerHTML = "";
  resultadoRoleta.textContent = "";
  roleta.style.background = "#333333";
  botaoGirar.disabled = true;

  if (itens.length === 0) {
    return;
  }

  const anguloFatia = 360 / itens.length;
  const partes = [];

  itens.forEach((item, indice) => {
    const inicio = indice * anguloFatia;
    const fim = inicio + anguloFatia;
    const cor = cores[indice % cores.length];

    partes.push(`${cor} ${inicio}deg ${fim}deg`);

    const nome = document.createElement("span");
    nome.className = "nome-fatia";
    nome.textContent = item;

    const centro = inicio + anguloFatia / 2;

    nome.style.transform =
      `rotate(${centro}deg) translateY(-100px) rotate(${-centro}deg)`;

    roleta.appendChild(nome);
  });

  roleta.style.background =
    `conic-gradient(${partes.join(", ")})`;

  // Volta a roleta para a posição inicial ao
  // atualizar a lista de nomes.
  anguloAtual = 0;
  roleta.style.transition = "none";
  roleta.style.transform = "rotate(0deg)";

  // Aplica a nova posição inicial antes de
  // reativar a animação.
  void roleta.offsetWidth;

  roleta.style.transition =
    "transform 5s cubic-bezier(.12, .72, .12, 1)";

  botaoGirar.disabled = false;
}

// CONJUNTO 3: Sortear pelo formulário tradicional
formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  if (girando) return;

  const itens = obterItens();

  if (itens.length === 0) {
    status.textContent = "Digite pelo menos um nome!";
    resultadoBox.classList.add("hidden");
    return;
  }

  const indice = Math.floor(Math.random() * itens.length);
  const vencedor = itens[indice];

  resultado.textContent = vencedor;
  resultadoBox.classList.remove("hidden");
  status.textContent = "Sorteio realizado!";
});

// CONJUNTO 4: Atualizar a roleta quando a lista mudar
entrada.addEventListener("input", montarRoleta);

// CONJUNTO 5: Girar e selecionar o vencedor
botaoGirar.addEventListener("click", function() {
  if (girando) return;

  const itens = obterItens();

  if (itens.length === 0) {
    resultadoRoleta.textContent = "Digite nomes antes de girar!";
    montarRoleta();
    return;
  }

  // Atualiza as fatias com a lista atual
  montarRoleta();

  const anguloFatia = 360 / itens.length;

  // Escolhe o vencedor aleatoriamente
  const indice = Math.floor(Math.random() * itens.length);
  const vencedor = itens[indice];

  // Calcula o centro da fatia sorteada
  const centro = indice * anguloFatia + anguloFatia / 2;

  // Faz o centro da fatia ficar sob o ponteiro
  const anguloAlvo = (360 - centro) % 360;
  const restoAtual = ((anguloAtual % 360) + 360) % 360;
  const ajuste = (anguloAlvo - restoAtual + 360) % 360;

  // Adiciona cinco voltas completas e o ajuste final
  anguloAtual += 5 * 360 + ajuste;

  girando = true;
  botaoGirar.disabled = true;
  resultadoRoleta.textContent = "Girando...";

  roleta.style.transform = `rotate(${anguloAtual}deg)`;

  // Aguarda a animação terminar
  function finalizarGiro(evento) {
    if (evento.propertyName !== "transform") return;

    roleta.removeEventListener("transitionend", finalizarGiro);

    resultadoRoleta.textContent = `O vencedor foi: ${vencedor}!`;
    girando = false;
    botaoGirar.disabled = false;
  }

  roleta.addEventListener("transitionend", finalizarGiro);
});

// CONJUNTO 6: Limpar o sorteador
botaoLimpar.addEventListener("click", function() {
  if (girando) return;

  entrada.value = "";
  resultado.textContent = "---";
  resultadoBox.classList.add("hidden");
  status.textContent = "";
  resultadoRoleta.textContent = "";

  montarRoleta();
});

// Cria a roleta assim que a página carrega
montarRoleta();