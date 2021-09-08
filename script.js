// create two separate arrays for books read and books to read
let booksToRead = [];
let booksRead = [];

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
    // depending on the value of the checkbox add book to different array
    const checkbox = document.querySelector("#read");
    let read = "";
    const newBook = new Book(title, author, pages, read);
    if (checkbox.checked) {
        newBook.read = "Read";
        booksRead.push(newBook);
    }
    else {
        newBook.read = "Not Read";
        booksToRead.push(newBook);
    }
}

// function for displaying the books in the table
function displayBooks(booksRead, booksToRead) {
    let booksToReadPlaceholder = document.querySelector(".display-books-to-read");
    let booksReadPlaceholder = document.querySelector(".display-books-read");

    // for every book in myLibrary array
    for (let book of booksToRead) {
        let bookIndex = booksToRead.indexOf(book);
        // create a table row to store book info and add it to the table
        let row = document.createElement("tr");
        // add a data-row-num atribute to the row with the index of the element in an array
        // TODO: differentiate the data-readnum and data-toreadnum 
        row.setAttribute("data-to-read-row-num", bookIndex);
        booksToReadPlaceholder.appendChild(row);
        // for every property in a book object
        for (let property in book) {
            let cell = document.createElement("td");
            if (property === "read") {
                let statusButton = document.createElement("button");
                statusButton.classList.add("status-btn");
                statusButton.textContent = "Finished it!";
                cell.appendChild(statusButton);
                row.appendChild(cell);
            }
            else {
                cell.textContent = book[property];
                row.appendChild(cell);
            }
        }
        createDeleteButton(bookIndex, row);
    }
    for (let book of booksRead) {
        let bookIndex = booksRead.indexOf(book);
        let row = document.createElement("tr");
        row.setAttribute("data-read-row-num", bookIndex);
        booksReadPlaceholder.appendChild(row);

        for (let property in book) {
            let cell = document.createElement("td");
            if (property === "read") {
                let statusButton = document.createElement("button");
                statusButton.classList.add("status-btn");
                statusButton.textContent = "Not finished?";
                cell.appendChild(statusButton);
                row.appendChild(cell);
            }
            else {
                cell.textContent = book[property];
                row.appendChild(cell);
            }
        }
        createDeleteButton(bookIndex, row);
    }
}

// takes book index which is then given as an data row num attribute
// to associate the button with the row in the table
function createDeleteButton(bookIndex, row) {
    // add a placeholder for the delete button
    // give it a specific class and append it to the table
    let deleteBtnPlaceholder = document.createElement("td");
    deleteBtnPlaceholder.classList.add("delete-btn-placeholder");
    row.appendChild(deleteBtnPlaceholder);

    // create a button give and it a data-row-num attribute associated with the row that it's in
    // append the button to the placeholder
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-rownum", bookIndex);
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtnPlaceholder.appendChild(deleteBtn);
}

// function for cleaning the table to display the current state of the table
function clearTable() {
    const tableBodies = document.querySelectorAll(".display-books");
    // TODO: needs to be for each
    // while tableBody has children, remove the first one
    tableBodies.forEach((tableBody) => {
        while (tableBody.childNodes.length) {
            tableBody.removeChild(tableBody.childNodes[0]);
        }
    })
}

// when the submit button on the form is clicked
// the book is stored in an array
// the table is clearead
// the new table is displayed with the new book in it
const submitBtn = document.getElementById("add-book");
submitBtn.addEventListener('click', () => {
    addBookToLibrary();
    clearTable();
    displayBooks(booksRead, booksToRead);
})

// onclick function for all the delete-btn
// it removes the row from the table which has the same data-row-num attribute
// as the clicked delete button
const booksToReadTableBody = document.querySelector(".display-books-to-read");
booksToReadTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        let rowToRemove = document.querySelector(`[data-to-read-row-num="${event.target.dataset.rownum}"]`);
        booksToReadTableBody.removeChild(rowToRemove);
        // remove the book object displayed in the given row from myLibrary array to prevent it from displaying while adding another book
        booksToRead.splice(event.target.dataset.rownum, 1);
    }
})

const booksReadTableBody = document.querySelector(".display-books-read");
booksReadTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        let rowToRemove = document.querySelector(`[data-read-row-num="${event.target.dataset.rownum}"]`);
        booksReadTableBody.removeChild(rowToRemove);
        // remove the book object displayed in the given row from myLibrary array to prevent it from displaying while adding another book
        booksRead.splice(event.target.dataset.rownum, 1);
    }
})



