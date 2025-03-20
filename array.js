// Criando um array bidimensional 3x3
const array3x3 = [
    [1, 2, 3], // Primeira linha
    [4, 5, 6], // Segunda linha
    [7, 8, 9]  // Terceira linha
];

// Exibindo o array no console
console.log("Array 3x3:");
for (let i = 0; i < array3x3.length; i++) {
    console.log(array3x3[i]);
}

// Acessando elementos específicos
let x = 1;
let y = 2;
//console.log("\nElemento na posição [x][y]:", array3x3[x][y]); // Exibe 6
console.log(`Elemento na posição [${x}][${y}]: ${array3x3[x][y]}`);

// Iterando e exibindo cada elemento individualmente
console.log("\nTodos os elementos do array:");
for (let i = 0; i < array3x3.length; i++) {
    for (let j = 0; j < array3x3[i].length; j++) {
        console.log(`Elemento na posição [${i}][${j}]: ${array3x3[i][j]}`);
    }
}
