let data = new Date();
let ano = data.getFullYear();

'use strict';

//Função para limpar o formulário
const limparFormulario = (endereco) => /*(endereco) => é uma aerofunction*/{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Função para preencher o formulário
const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.uf;
    document.getElementById('estado').value = endereco.localidade;
} //Expressões regulares no JavaScript - PESQUISAR

//Validando o cep
const eNumero = (numero) => /^[0-9]+$/.test(numero); /*Indicando que somente podem ser estes os valores - de 0 a 9*/

//Validando cep
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCEP = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!'
        }else{
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto'
    }
    
}


document.getElementById('cep').addEventListener('focusout', pesquisarCEP);

document.getElementById('data').innerHTML = ("Divorced Squad - ", ano);
