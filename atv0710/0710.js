const titulo =
    document.getElementById("titulo");
const btnAlterarTitulo =
    document.getElementById("btnAlterarTitulo");
const btnAlterarEstilo =
    document.getElementById("btnAlterarEstilo");
const coresTitulo = ["red", "yellow", "green", "blue", "black"];
let indiceCorTitulo = 0;

btnAlterarTitulo.addEventListener("click", function() {
    titulo.textContent = "Meu primeiro projeto DOM!";
});

btnAlterarEstilo.addEventListener("click", function() {
    titulo.style.color = coresTitulo[indiceCorTitulo];
    indiceCorTitulo = (indiceCorTitulo + 1) % coresTitulo.length;
});

const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const btnCalcular =
    document.getElementById("btnCalcular");
const resultado =
    document.getElementById("resultado");
const listaPessoas =
    document.getElementById("listaPessoas");

const totalPessoas =
    document.getElementById("totalPessoas");
const btnContador =
    document.getElementById("btnContador");


const pessoas = [];
let contador = 0;

btnContador.addEventListener("click", function() {
    contador++;
    btnContador.textContent = `Clique: ${contador}`;
});


btnCalcular.addEventListener("click", function() {

    const nomePessoa = nome.value.trim();

    const pesoPessoa =
        Number(peso.value);


    const alturaPessoa =
        Number(altura.value);


    if (
        nomePessoa === "" ||
        pesoPessoa <= 0 ||
        alturaPessoa <= 0
    ) {

        resultado.innerHTML = `

            <p>
                Preencha todos os campos corretamente.
            </p>

        `;

        return;

    }

    const alturaMetros =
        alturaPessoa / 100;

    const imc =
        pesoPessoa /
        (alturaMetros * alturaMetros);

    const imcFormatado =
        imc.toFixed(2);

    let classificacao;
    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    }
    else if (imc < 25) {
        classificacao = "Peso adequado";
    }
    else if (imc < 30) {
        classificacao = "Sobrepeso";
    }
    else {
        classificacao = "Obesidade";
    }

    resultado.innerHTML = `

        <h3>
            IMC: ${imcFormatado}
        </h3>

        <p>
            ${classificacao}
        </p>

    `;
    pessoas.push({

        nome: nomePessoa,

        peso: pesoPessoa,

        altura: alturaMetros,

        imc: imcFormatado,

        classificacao: classificacao

    });

   
    mostrarPessoas();

    nome.value = "";
    peso.value = "";
    altura.value = "";

    nome.focus();

});

function mostrarPessoas() {
    listaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        listaPessoas.innerHTML = `
            <div class="vazio">
                Nenhuma pessoa cadastrada ainda.
            </div>

        `;

    }

    pessoas.forEach(function(pessoa, index) {

        listaPessoas.innerHTML += `
            <div class="pessoa">
                <!-- DADOS DA PESSOA -->
                <div class="pessoa-topo">
                    <div>
                        <h3>
                            ${pessoa.nome}
                        </h3>
                        <p class="pessoa-info">
                            Peso:
                            ${pessoa.peso} kg
                            |
                            Altura:
                            ${pessoa.altura.toFixed(2)} m
                        </p>
                    </div>
                    <!-- BOTÃO EXCLUIR -->
                    <button
                        class="excluir"
                        onclick="excluirPessoa(${index})">
                        Excluir
                    </button>
                </div>



                <!-- RESULTADO DO IMC -->

                <div class="imc">

                    IMC:
                    ${pessoa.imc}

                </div>



                <!-- CLASSIFICAÇÃO -->

                <p>

                    ${pessoa.classificacao}

                </p>


            </div>

        `;

    });


    totalPessoas.textContent =
        pessoas.length;

}



function excluirPessoa(index) {


   

    pessoas.splice(index, 1);


    mostrarPessoas();

}