// array that will store all the book objects
let myLibrary = [];


// constructor to create book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}


// function that takes the user's input from the form and adds the book to myLibrary array
function addBookToLibrary() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// when the submit button on the form is clicked, the book is stored in an array
const submitBtn = document.getElementById("add-book");
submitBtn.addEventListener('click', () => {
    addBookToLibrary();
})

/*
Function for displaying a book on a page:
- loop through each object of the myLibrary array
- create a container for the book (first figure out the layout of the books on the page)
- populate the container with the book info
*/




