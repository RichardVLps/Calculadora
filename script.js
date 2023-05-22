const screen = document.querySelector('#screen');
const valor = document.querySelectorAll('[valor]');

let lastInputIsOperator = false;

valor.forEach(valor => {
  valor.addEventListener('click', () => {
    var numberValue = valor.textContent;

    if (screen.value === "-" && numberValue.match(/[÷x+]/)) {
      return; // Impede que outros operadores sejam clicados quando a expressão começa com "-"
    }

    if (lastInputIsOperator && numberValue.match(/[÷x+-]/)) {
      screen.value = screen.value.slice(0, -1); // Remove o operador anterior
    }

    if (screen.value === "" && !numberValue.match(/[-0123456789]/)) {
      if (numberValue !== "-") return; // Permite apenas o operador "-" no início da expressão
    }

    lastInputIsOperator = numberValue.match(/[÷x+-]/);
    screen.value += numberValue;
  });
});


document.querySelector('#delete').addEventListener('click', () => {
  screen.value = screen.value.slice(0, -1);
  lastInputIsOperator = screen.value.match(/[÷x+-]$/);
});

document.querySelector('#troca').addEventListener('click', () => {
  if (screen.value !== "") {
    screen.value = Number(screen.value) * -1;
  }
});

document.querySelector('#clear').addEventListener('click', () => {
  screen.value = "";
});

document.querySelector('#equal').addEventListener('click', calcular);

function calcular() {
  let expressao = screen.value;
  
  expressao = expressao.replace(/÷/g, '/');
  expressao = expressao.replace(/x/g, '*');
  
  let resultado = eval(expressao);
  screen.value = resultado;
  lastInputIsOperator = false;
}