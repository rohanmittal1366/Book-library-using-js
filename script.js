class Book {

    contructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    static displayBooks() {
        const StoredBooks = [
            {
                title : 'Mind reading',
                author: 'swetabh',
                isbn: '3454'
            },
            {
                title:'Hello java ',
                author: 'michale',
                isbn : '3444'
            }
        ];

        const books = StoredBooks;

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

    static deleteBook(el) 
    {
        if(el.classList.contains('delete')){

            el.parentElement.parentElement.remove();
        }

    }

    static clearField(){

        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }


}


document.addEventListener('DOMContentLoaded',UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit',(e) =>{

    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '')
    {
        alert("Field is empty, Please fill it first ");
    }
    else
    {
    const book = new Book(title,author,isbn);
    UI.addBooksToList(book);

    UI.clearField();

    }

});

document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target)
});


