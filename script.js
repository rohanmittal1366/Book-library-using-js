class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    static displayBooks() {
        const books = Store.getbooks();
        books.forEach((book) => UI.addBooksToList(book));
    }


    static addBooksToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>   
        <td><a href="#" class="btn btn-danger btn-sm delete">
        X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {

            el.parentElement.parentElement.remove();
        }

    }

    static showAlert(msg, className) {

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearField() {

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }


}


class Store {

    static getbooks() {

        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static addbook(book) {
        const books = Store.getbooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removebook(isbn) {
        const books = Store.getbooks();
        books.forEach((book, index) => {

            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}



document.addEventListener('DOMContentLoaded', UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Field is empty, Please fill it first', 'danger');
    }
    else {
        const book = new Book(title, author, isbn);
        UI.addBooksToList(book);
        Store.addbook(book);
        UI.showAlert('Book is succesfully added', 'success');
        UI.clearField();

    }

});

document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);
    Store.removebook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book is succesfully removed', 'success');
});


