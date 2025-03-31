const fs = require('fs');

const path = require('path');



const dataPath = path.join(__dirname, 'books.json');



// Função para ler os livros do arquivo JSON

function getBooks(res) {

  fs.readFile(dataPath, 'utf8', (err, data) => {

    if (err) {

      res.writeHead(500, { 'Content-Type': 'text/plain' });

      res.end('Erro ao ler os dados');

    } else {

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(data);

    }

  });

}



// Função para adicionar um novo livro

function addBook(req, res) {

  let body = '';

  req.on('data', chunk => {

    body += chunk.toString();

  });



  req.on('end', () => {

    const newBook = JSON.parse(body);



    fs.readFile(dataPath, 'utf8', (err, data) => {

      if (err) {

        res.writeHead(500, { 'Content-Type': 'text/plain' });

        res.end('Erro ao ler os dados');

      } else {

        const books = JSON.parse(data);

        newBook.id = books.length + 1; // Gera ID único

        books.push(newBook);



        fs.writeFile(dataPath, JSON.stringify(books, null, 2), err => {

          if (err) {

            res.writeHead(500, { 'Content-Type': 'text/plain' });

            res.end('Erro ao salvar o livro');

          } else {

            res.writeHead(201, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify(newBook));

          }

        });

      }

    });

  });

}



// Função para atualizar um livro

function updateBook(req, res, id) {

  let body = '';

  req.on('data', chunk => {

    body += chunk.toString();

  });



  req.on('end', () => {

    const updatedBook = JSON.parse(body);



    fs.readFile(dataPath, 'utf8', (err, data) => {

      if (err) {

        res.writeHead(500, { 'Content-Type': 'text/plain' });

        res.end('Erro ao ler os dados');

      } else {

        let books = JSON.parse(data);

        const bookIndex = books.findIndex(book => book.id === parseInt(id));



        if (bookIndex === -1) {

          res.writeHead(404, { 'Content-Type': 'text/plain' });

          res.end('Livro não encontrado');

        } else {

          books[bookIndex] = { ...books[bookIndex], ...updatedBook };



          fs.writeFile(dataPath, JSON.stringify(books, null, 2), err => {

            if (err) {

              res.writeHead(500, { 'Content-Type': 'text/plain' });

              res.end('Erro ao salvar as mudanças');

            } else {

              res.writeHead(200, { 'Content-Type': 'application/json' });

              res.end(JSON.stringify(books[bookIndex]));

            }

          });

        }

      }

    });

  });

}



// Função para deletar um livro

function deleteBook(res, id) {

  fs.readFile(dataPath, 'utf8', (err, data) => {

    if (err) {

      res.writeHead(500, { 'Content-Type': 'text/plain' });

      res.end('Erro ao ler os dados');

    } else {

      let books = JSON.parse(data);

      const filteredBooks = books.filter(book => book.id !== parseInt(id));



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



module.exports = { getBooks, addBook, updateBook, deleteBook };

