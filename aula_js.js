// Função de calculadora

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função de calculadora
function calcular() {
    rl.question("Digite o primeiro número: ", (num1) => {
        rl.question("Digite o segundo número: ", (num2) => {
            rl.question("Escolha uma operação: +, -, *, / ", (operacao) => {
                const numero1 = parseFloat(num1);
                const numero2 = parseFloat(num2);

                let resultado;

                switch (operacao) {
                    case "+":
                        resultado = numero1 + numero2;
                        break;
                    case "-":
                        resultado = numero1 - numero2;
                        break;
                    case "*":
                        resultado = numero1 * numero2;
                        break;
                    case "/":
                        if (numero2 !== 0) {
                            resultado = numero1 / numero2;
                        } else {
                            console.log("Erro: Divisão por zero!");
                            rl.close();
                            return;
                        }
                        break;
                        case "**":
                            resultado = num1 ** num2;
                            break;
                    default:
                    console.log("Operação inválida!");
                    rl.close();
                    return;
                }

                console.log(`O resultado é: ${resultado}`);
                rl.close();
            });
        });
    });
}

// Chamar a função calculadora
calcular();
