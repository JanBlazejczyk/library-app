// array that will store all the book objects
let myLibrary = [];

// constructor to create book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// function that takes the user's input from the form
// creates the new book object and pushes it into myLibrary array
function addBookToLibrary() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    // check if the checkbox is on and display a proper message
    const checkbox = document.querySelector("#read");
    let read = "";
    if (checkbox.checked) {
        read = "Read";
    }
    else {
        read = "Not Read"
    }
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// function for displaying the books in the table
function displayBooks(myLibrary) {
    const table = document.getElementById("display-books");
    // for every book in myLibrary array
    for (let book of myLibrary) {
        // create a table row to store book info and add it to the table
        let row = document.createElement("tr");
        table.appendChild(row);
        // for every property in a book object
        for (let property in book) {
            let cell = document.createElement("td");
            cell.textContent = book[property];
            row.appendChild(cell);
        }
    }
}

// function for cleaning the table to display the current state of the table
function clearTable() {
    const tableBody = document.getElementById("display-books");
    // while tableBody has children, remove the first one
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
}

// when the submit button on the form is clicked
// the book is stored in an array
// the table is clearead
// the new table is displayed with the new book in it
const submitBtn = document.getElementById("add-book");
submitBtn.addEventListener('click', () => {
    addBookToLibrary();
    clearTable();
    displayBooks(myLibrary);
})

