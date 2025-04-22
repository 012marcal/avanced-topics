// Importa o módulo nativo 'http' do Node.js para criar um servidor web
const http = require('http');

// Importa o módulo 'booksController', que contém as funções para manipular os dados dos livros
const booksController = require('./booksController.js');

// Cria o servidor HTTP e define a função de callback que lida com as requisições
const server = http.createServer((req, res) => {

  // Divide a URL da requisição em partes separadas por '/' e armazena na variável 'route' e 'id'
  // Por exemplo: /books/123 -> ['', 'books', '123']
  const [_, route, id] = req.url.split('/'); 

  // Verifica se a rota da URL é 'books'
  if (route === 'books') {

    // Se o método da requisição for GET, chama a função para listar os livros
    if (req.method === 'GET') {
      booksController.getBooks(res);

    // Se o método for POST, chama a função para adicionar um novo livro
    } else if (req.method === 'POST') {
      booksController.addBook(req, res);

    // Se o método for PUT e houver um 'id', chama a função para atualizar um livro específico
    } else if (req.method === 'PUT' && id) {
      booksController.updateBook(req, res, id);

    // Se o método for DELETE e houver um 'id', chama a função para deletar um livro específico
    } else if (req.method === 'DELETE' && id) {
      booksController.deleteBook(res, id);

    // Se a requisição não corresponder a nenhum dos métodos acima, retorna erro 404
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' }); // Define o cabeçalho de resposta como texto puro
      res.end('Rota não encontrada'); // Envia mensagem de erro
    }

  // Se a rota não for 'books', também retorna erro 404
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' }); // Define o cabeçalho de resposta como texto puro
    res.end('Rota não encontrada'); // Envia mensagem de erro
  }
});

// Faz o servidor escutar na porta 3000 e exibe uma mensagem no console quando estiver pronto
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
