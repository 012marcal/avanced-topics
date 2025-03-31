const http = require('http');

const booksController = require('./booksController.js');



const server = http.createServer((req, res) => {

  const [_, route, id] = req.url.split('/'); // Divide a URL em partes



  if (route === 'books') {

    if (req.method === 'GET') {

      booksController.getBooks(res);

    } else if (req.method === 'POST') {

      booksController.addBook(req, res);

    } else if (req.method === 'PUT' && id) {

      booksController.updateBook(req, res, id);

    } else if (req.method === 'DELETE' && id) {

      booksController.deleteBook(res, id);

    } else {

      res.writeHead(404, { 'Content-Type': 'text/plain' });

      res.end('Rota não encontrada');

    }

  } else {

    res.writeHead(404, { 'Content-Type': 'text/plain' });

    res.end('Rota não encontrada');

  }

});



server.listen(3000, () => {

  console.log('Servidor rodando na porta 3000');

});