// Importa o módulo 'fs' (File System) do Node.js, usado para ler e escrever arquivos
const fs = require('fs');

// Importa o módulo 'path', usado para manipular caminhos de arquivos de forma segura e compatível com todos os sistemas operacionais
const path = require('path');

// Define o caminho completo para o arquivo 'books.json', que armazenará os dados dos livros
const dataPath = path.join(__dirname, 'books.json');



// -------- Função para obter todos os livros -------- //
function getBooks(res) {
  // Lê o conteúdo do arquivo JSON
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      // Se ocorrer erro ao ler, responde com status 500 (erro interno do servidor)
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro ao ler os dados');
    } else {
      // Caso contrário, responde com status 200 e envia o conteúdo do arquivo em formato JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
}



// -------- Função para adicionar um novo livro -------- //
function addBook(req, res) {
  let body = ''; // Inicializa uma string vazia para armazenar os dados da requisição

  // Vai acumulando os pedaços do corpo da requisição (stream)
  req.on('data', chunk => {
    body += chunk.toString(); // Concatena cada pedaço convertido em string
  });

  // Quando toda a requisição for recebida
  req.on('end', () => {
    const newBook = JSON.parse(body); // Converte o JSON recebido em objeto JavaScript

    // Lê o arquivo atual de livros
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao ler os dados');
      } else {
        const books = JSON.parse(data); // Converte os dados lidos em array de objetos

        newBook.id = books.length + 1; // Define um novo ID para o livro (sequencial)
        books.push(newBook); // Adiciona o novo livro ao array

        // Salva os dados atualizados no arquivo
        fs.writeFile(dataPath, JSON.stringify(books, null, 2), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao salvar o livro');
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newBook)); // Retorna o livro adicionado
          }
        });
      }
    });
  });
}



// -------- Função para atualizar um livro existente -------- //
function updateBook(req, res, id) {
  let body = ''; // Inicializa uma string para armazenar os dados do corpo da requisição

  // Vai recebendo os pedaços da requisição
  req.on('data', chunk => {
    body += chunk.toString();
  });

  // Quando a requisição termina
  req.on('end', () => {
    const updatedBook = JSON.parse(body); // Converte o JSON recebido para objeto

    // Lê o arquivo com os livros existentes
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao ler os dados');
      } else {
        let books = JSON.parse(data); // Converte os dados em array de livros

        // Procura o índice do livro com o ID fornecido
        const bookIndex = books.findIndex(book => book.id === parseInt(id));

        if (bookIndex === -1) {
          // Se o livro não for encontrado, retorna erro 404
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Livro não encontrado');
        } else {
          // Atualiza os dados do livro, mantendo os antigos onde não foram modificados
          books[bookIndex] = { ...books[bookIndex], ...updatedBook };

          // Escreve o novo array atualizado no arquivo
          fs.writeFile(dataPath, JSON.stringify(books, null, 2), err => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Erro ao salvar as mudanças');
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(books[bookIndex])); // Retorna o livro atualizado
            }
          });
        }
      }
    });
  });
}



// -------- Função para deletar um livro -------- //
function deleteBook(res, id) {
  // Lê os livros salvos no arquivo
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro ao ler os dados');
    } else {
      let books = JSON.parse(data); // Converte os dados em array

      // Cria um novo array sem o livro com o ID especificado
      const filteredBooks = books.filter(book => book.id !== parseInt(id));

      // Salva o novo array no arquivo
      fs.writeFile(dataPath, JSON.stringify(filteredBooks, null, 2), err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao deletar o livro');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Livro deletado com sucesso');
        }
      });
    }
  });
}



// Exporta as funções para que possam ser usadas em outros arquivos
module.exports = { getBooks, addBook, updateBook, deleteBook };
