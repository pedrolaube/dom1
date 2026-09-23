const nome = document.querySelector("#nome");

const botao = document.querySelector("#btnEntrar");

const resultado = document.querySelector("#resultado");

const tituloCurso = document.querySelector("#tituloCurso");

const botaoAlterar = document.querySelector("#btnAlterar");

botao.addEventListener("click", function () {
  const nomeDigitado = nome.value;

  resultado.textContent = `Olá, ${nomeDigitado}! Seja bem-vindo!`;
});

botaoAlterar.addEventListener("click", function () {
  tituloCurso.textContent = "Desenvolvimento de Sistemas - SENAI";
  tituloCurso.style.color = "red";
});

const botaoCliques = document.querySelector("#btnClique");
const contador = document.querySelector("#contador");
let cliques = 0;

botaoCliques.addEventListener("click", function () {
  cliques++;
  contador.textContent = "Cliques: " + cliques;
});
const atendimento = document.querySelector("#btnAbrir");
const status = document.querySelector("#status");
atendimento.addEventListener("click", function () {
  status.textContent = "Status: Atendimento Aberto";
  status.style.color = "green";
});
const produto = document.querySelector("#produto");
const quantidade = document.querySelector("#quantidade");
const preco = document.querySelector("#preco");
const calcular = document.querySelector("#btnCalcular");
const operacao = document.querySelector("#resultadoCalculadora");

calcular.addEventListener("click", function () {
  let quantidadeNumero = Number(quantidade.value);
  let precoNumero = Number(preco.value);
  let total = quantidadeNumero * precoNumero;
  operacao.textContent = "Total: R$ " + total;
});
const nota1 = document.querySelector("#nota1");
const nota2 = document.querySelector("#nota2");
const nota3 = document.querySelector("#nota3");

const notasBotao = document.querySelector("#btnNotas");
const resultadoNotas = document.querySelector("#resultadoNotas");

notasBotao.addEventListener("click", function () {
  let n1 = Number(nota1.value);
  let n2 = Number(nota2.value);
  let n3 = Number(nota3.value);

  let media = (n1 + n2 + n3) / 3;

  if (media >= 6) {
    resultadoNotas.textContent = "Média: " + media.toFixed(1) + " — Aprovado";
  } else {
    resultadoNotas.textContent = "Média: " + media.toFixed(1) + " — Reprovado";
  }
});
const usuario = document.querySelector("#nomeCadastro");
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

const botaoCadastrar = document.querySelector("#btnCadastrar");
const mensagem = document.querySelector("#mensagemCadastro");

botaoCadastrar.addEventListener("click", function () {
  if (usuario.value === "" || email.value === "" || senha.value === "") {
    mensagem.textContent = "Preencha todos os campos.";
  } else {
    mensagem.textContent = "Cadastro realizado com sucesso!";
  }
});

const produtoEstoque = document.querySelector("#produtoEstoque");
const quantidadeDisponivel = document.querySelector("#quantidadeDisponivel");
const quantidadeSolicitada = document.querySelector("#quantidadeSolicitada");
const btnVerificarEstoque = document.querySelector("#btnVerificarEstoque");
const mensagemEstoque = document.querySelector("#mensagemEstoque");

btnVerificarEstoque.addEventListener("click", function () {
  const disponivel = Number(quantidadeDisponivel.value);
  const solicitada = Number(quantidadeSolicitada.value);

  mensagemEstoque.classList.remove("sucesso", "erro");
  if (produtoEstoque.value.trim() !== "" && solicitada <= disponivel) {
    mensagemEstoque.textContent = "Pedido disponível para separação.";
    mensagemEstoque.classList.add("sucesso");
  } else {
    mensagemEstoque.textContent = "Estoque insuficiente.";
    mensagemEstoque.classList.add("erro");
  }
});

const tarefa = document.querySelector("#tarefa");
const btnAdicionarTarefa = document.querySelector("#btnAdicionarTarefa");
const listaTarefas = document.querySelector("#listaTarefas");

btnAdicionarTarefa.addEventListener("click", function () {
  if (tarefa.value.trim() === "") return;

  const itemTarefa = document.createElement("li");
  itemTarefa.textContent = tarefa.value.trim();
  listaTarefas.appendChild(itemTarefa);
  tarefa.value = "";
});

const produtoDesconto = document.querySelector("#produtoDesconto");
const precoDesconto = document.querySelector("#precoDesconto");
const percentualDesconto = document.querySelector("#percentualDesconto");
const btnCalcularDesconto = document.querySelector("#btnCalcularDesconto");
const resultadoDesconto = document.querySelector("#resultadoDesconto");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

btnCalcularDesconto.addEventListener("click", function () {
  const precoProduto = Number(precoDesconto.value);
  const percentual = Number(percentualDesconto.value);
  const valorDesconto = (precoProduto * percentual) / 100;
  const precoFinal = precoProduto - valorDesconto;

  if (
    produtoDesconto.value.trim() === "" ||
    precoProduto < 0 ||
    percentual < 0 ||
    percentual > 100
  ) {
    resultadoDesconto.textContent = "Preencha os dados corretamente.";
    resultadoDesconto.classList.add("erro");
    return;
  }

  resultadoDesconto.classList.remove("erro");
  resultadoDesconto.innerHTML = `Desconto: ${formatarMoeda(valorDesconto)}<br>Total: ${formatarMoeda(precoFinal)}`;
});

const usuarioLogin = document.querySelector("#usuarioLogin");
const senhaLogin = document.querySelector("#senhaLogin");
const btnLogin = document.querySelector("#btnLogin");
const formularioLogin = document.querySelector("#formularioLogin");
const mensagemLogin = document.querySelector("#mensagemLogin");
const areaSistema = document.querySelector("#areaSistema");

btnLogin.addEventListener("click", function () {
  if (usuarioLogin.value === "aluno" && senhaLogin.value === "1234") {
    formularioLogin.classList.add("oculto");
    mensagemLogin.textContent = "Login realizado com sucesso!";
    mensagemLogin.classList.add("sucesso");
    areaSistema.classList.remove("oculto");
  } else {
    mensagemLogin.textContent = "Usuário ou senha inválidos.";
    mensagemLogin.classList.add("erro");
  }
});

const produtoCarrinho = document.querySelector("#produtoCarrinho");
const precoCarrinho = document.querySelector("#precoCarrinho");
const btnAdicionarCarrinho = document.querySelector("#btnAdicionarCarrinho");
const listaCarrinho = document.querySelector("#listaCarrinho");
const resumoCarrinho = document.querySelector("#resumoCarrinho");
const carrinho = [];

function atualizarCarrinho() {
  listaCarrinho.textContent = "";
  let total = 0;

  carrinho.forEach(function (item, indice) {
    total += item.preco;
    const itemCarrinho = document.createElement("li");
    itemCarrinho.textContent = `${item.nome} - ${formatarMoeda(item.preco)}`;
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", function () {
      carrinho.splice(indice, 1);
      atualizarCarrinho();
    });
    itemCarrinho.appendChild(btnRemover);
    listaCarrinho.appendChild(itemCarrinho);
  });

  resumoCarrinho.textContent = `Produtos: ${carrinho.length} | Total: ${formatarMoeda(total)}`;
}

btnAdicionarCarrinho.addEventListener("click", function () {
  if (produtoCarrinho.value.trim() === "" || Number(precoCarrinho.value) < 0)
    return;
  carrinho.push({
    nome: produtoCarrinho.value.trim(),
    preco: Number(precoCarrinho.value),
  });
  produtoCarrinho.value = "";
  precoCarrinho.value = "";
  atualizarCarrinho();
});

const nomeAluno = document.querySelector("#nomeAluno");
const idadeAluno = document.querySelector("#idadeAluno");
const cursoAluno = document.querySelector("#cursoAluno");
const btnCadastrarAluno = document.querySelector("#btnCadastrarAluno");
const tabelaAlunos = document.querySelector("#tabelaAlunos");

btnCadastrarAluno.addEventListener("click", function () {
  if (
    nomeAluno.value.trim() === "" ||
    idadeAluno.value === "" ||
    cursoAluno.value.trim() === ""
  )
    return;

  const linha = document.createElement("tr");
  [nomeAluno.value.trim(), idadeAluno.value, cursoAluno.value.trim()].forEach(
    function (valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    },
  );
  const celulaAcao = document.createElement("td");
  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.addEventListener("click", function () {
    linha.remove();
  });
  celulaAcao.appendChild(btnExcluir);
  linha.appendChild(celulaAcao);
  tabelaAlunos.appendChild(linha);
  nomeAluno.value = "";
  idadeAluno.value = "";
  cursoAluno.value = "";
});

const produtoVenda = document.querySelector("#produtoVenda");
const quantidadeVenda = document.querySelector("#quantidadeVenda");
const valorVenda = document.querySelector("#valorVenda");
const btnAdicionarVenda = document.querySelector("#btnAdicionarVenda");
const pesquisaVenda = document.querySelector("#pesquisaVenda");
const tabelaVendas = document.querySelector("#tabelaVendas");
const vendas = [];

function atualizarDashboard() {
  const filtro = pesquisaVenda.value.toLowerCase();
  tabelaVendas.textContent = "";
  let faturamento = 0;
  let itens = 0;

  vendas.forEach(function (venda) {
    faturamento += venda.total;
    itens += venda.quantidade;
    if (!venda.produto.toLowerCase().includes(filtro)) return;

    const linha = document.createElement("tr");
    [
      venda.produto,
      venda.quantidade,
      formatarMoeda(venda.valor),
      formatarMoeda(venda.total),
    ].forEach(function (valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });
    tabelaVendas.appendChild(linha);
  });

  document.querySelector("#faturamentoTotal").textContent =
    `Faturamento: ${formatarMoeda(faturamento)}`;
  document.querySelector("#itensVendidos").textContent =
    `Itens vendidos: ${itens}`;
  document.querySelector("#vendasRealizadas").textContent =
    `Vendas realizadas: ${vendas.length}`;
}

btnAdicionarVenda.addEventListener("click", function () {
  const quantidade = Number(quantidadeVenda.value);
  const valor = Number(valorVenda.value);
  if (produtoVenda.value.trim() === "" || quantidade <= 0 || valor < 0) return;

  vendas.push({
    produto: produtoVenda.value.trim(),
    quantidade,
    valor,
    total: quantidade * valor,
  });
  produtoVenda.value = "";
  quantidadeVenda.value = "";
  valorVenda.value = "";
  atualizarDashboard();
});

pesquisaVenda.addEventListener("input", atualizarDashboard);

const nomeAcademico = document.querySelector("#nomeAcademico");
const raAcademico = document.querySelector("#raAcademico");
const cursoAcademico = document.querySelector("#cursoAcademico");
const nota1Academico = document.querySelector("#nota1Academico");
const nota2Academico = document.querySelector("#nota2Academico");
const btnCadastrarAcademico = document.querySelector("#btnCadastrarAcademico");
const pesquisaAcademico = document.querySelector("#pesquisaAcademico");
const tabelaAcademica = document.querySelector("#tabelaAcademica");
const contadoresAcademicos = document.querySelector("#contadoresAcademicos");
const alunosAcademicos = [];

function atualizarTabelaAcademica() {
  const filtro = pesquisaAcademico.value.toLowerCase();
  tabelaAcademica.textContent = "";
  alunosAcademicos.forEach(function (aluno, indice) {
    if (
      !`${aluno.nome} ${aluno.ra} ${aluno.curso}`.toLowerCase().includes(filtro)
    )
      return;

    const linha = document.createElement("tr");
    [
      aluno.nome,
      aluno.ra,
      aluno.curso,
      aluno.media.toFixed(1),
      aluno.situacao,
    ].forEach(function (valor) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.appendChild(celula);
    });
    const celulaAcao = document.createElement("td");
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", function () {
      alunosAcademicos.splice(indice, 1);
      atualizarTabelaAcademica();
    });
    celulaAcao.appendChild(btnExcluir);
    linha.appendChild(celulaAcao);
    tabelaAcademica.appendChild(linha);
  });

  const aprovados = alunosAcademicos.filter(function (aluno) {
    return aluno.situacao === "Aprovado";
  }).length;
  const reprovados = alunosAcademicos.filter(function (aluno) {
    return aluno.situacao === "Reprovado";
  }).length;
  contadoresAcademicos.textContent = `Alunos: ${alunosAcademicos.length} | Aprovados: ${aprovados} | Reprovados: ${reprovados}`;
}

btnCadastrarAcademico.addEventListener("click", function () {
  const nota1 = Number(nota1Academico.value);
  const nota2 = Number(nota2Academico.value);
  if (
    nomeAcademico.value.trim() === "" ||
    raAcademico.value.trim() === "" ||
    cursoAcademico.value.trim() === "" ||
    nota1 < 0 ||
    nota2 < 0 ||
    nota1 > 10 ||
    nota2 > 10
  )
    return;

  const media = (nota1 + nota2) / 2;
  let situacao = "Reprovado";
  if (media >= 6) situacao = "Aprovado";
  else if (media >= 4) situacao = "Recuperação";
  alunosAcademicos.push({
    nome: nomeAcademico.value.trim(),
    ra: raAcademico.value.trim(),
    curso: cursoAcademico.value.trim(),
    media,
    situacao,
  });
  nomeAcademico.value = "";
  raAcademico.value = "";
  cursoAcademico.value = "";
  nota1Academico.value = "";
  nota2Academico.value = "";
  atualizarTabelaAcademica();
});

pesquisaAcademico.addEventListener("input", atualizarTabelaAcademica);
