// create an array that will hold all the book objects
let books = [];

// constructor to create book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// changes the book status
Book.prototype.toggleStatus = function () {
    if (this.read === "Read") {
        this.read = "Not read";
    }
    else if (this.read === "Not read") {
        this.read = "Read";
    }
}

// adds the book object to the books array
Book.prototype.addToArray = function () {
    books.push(this);
}

// gathers user's input from the form and returns the new book object
function getBookFromForm() {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
    // if the "Read" checkbox in the form is checked the correct status is assigned
    let checkbox = document.querySelector("#read");
    if (checkbox.checked) {
        read = "Read";
    }
    else {
        read = "Not read"
    }
    const newBook = new Book(title, author, pages, read);
    return newBook;
}

// function for displaying the books in the table
function displayBooks(books) {
    // separate tables for the books that are read and not read
    let booksToReadPlaceholder = document.querySelector(".display-books-to-read");
    let booksReadPlaceholder = document.querySelector(".display-books-read");

    // for every book in books array
    for (let book of books) {
        let bookIndex = books.indexOf(book);
        // create a table row to store book info
        let row = document.createElement("tr");
        // add a data atribute to the row with the index that the given object has in an array
        row.setAttribute("data-index", bookIndex);
        // for every property in the given book object
        for (let property in book) {
            // create a cell in a new row
            let cell = document.createElement("td");
            // iterate only through the properties of the constructor
            if (book.hasOwnProperty(property)) {
                // for the read property the correct status icon is created and displayed
                if (property === "read") {
                    createStatusIcon(book, row, bookIndex);
                }
                // the rest of the properties populate the table as text
                else {
                    cell.textContent = book[property];
                    row.appendChild(cell);
                }
            }
        }
        // the remove icon is created 
        createDeleteIcon(bookIndex, row);
        // based on the value of the "read" property, append the book to one or the other table
        if (book.read === "Read") {
            booksReadPlaceholder.appendChild(row);
        }
        else if (book.read === "Not read") {
            booksToReadPlaceholder.appendChild(row);
        }

    }
}

// creates an icon to toggle the book status
// takes the current book - needed to access the "read" property and figure out which icon to display
// takes the current row to display the icon in the correct row
function createStatusIcon(book, row, bookIndex) {
    // create a placeholder for the status icon and append it in the row
    let statusBtnPlaceholder = document.createElement("td");
    statusBtnPlaceholder.classList.add("status-btn-placeholder");
    row.appendChild(statusBtnPlaceholder);
    // display the correct icon in the placeholder with the data attribute of the row that it's in
    if (book.read === "Not read") {
        statusBtnPlaceholder.innerHTML = `<i class="bi bi-check-circle-fill status-btn" data-index="${bookIndex}"></i>`;
    }
    else if (book.read === "Read") {
        statusBtnPlaceholder.innerHTML = `<i class="bi bi-x-circle-fill status-btn" data-index="${bookIndex}"></i>`;
    }
}

// creates an icon to delete books
//takes book index which is then given as an data-index attribute
// to associate the button with the row in the table
function createDeleteIcon(bookIndex, row) {
    // add a placeholder for the delete button
    let deleteBtnPlaceholder = document.createElement("td");
    deleteBtnPlaceholder.classList.add("delete-btn-placeholder");
    row.appendChild(deleteBtnPlaceholder);

    // display the icon with the data attribute of the row that it's in
    deleteBtnPlaceholder.innerHTML = `<i class="bi bi-trash-fill delete-btn" data-index="${bookIndex}"></i>`;

}

// function for cleaning the table to display the current state of the table
function clearTable() {
    const tableBodies = document.querySelectorAll(".display-books");
    // while any tableBody has children, remove them
    tableBodies.forEach((tableBody) => {
        while (tableBody.childNodes.length) {
            tableBody.removeChild(tableBody.childNodes[0]);
        }
    })
}

// when the submit button on the form is clicked
// the new book object is created
// the book is stored in an array
// the current displaying table is clearead
// the new table is displayed based on the new state of the array
const submitBtn = document.getElementById("add-book");
submitBtn.addEventListener('click', () => {
    let newBook = getBookFromForm();
    newBook.addToArray();
    clearTable();
    displayBooks(books);
})

// event listener for clicking on status or delete icons
const tables = document.querySelector(".all-books");
tables.addEventListener('click', (event) => {
    // clicking delete icon
    if (event.target.classList.contains('delete-btn')) {
        // removes the book which index is associated with the given row from books array
        books.splice(event.target.dataset.index, 1);
        // the current displaying table is clearead
        clearTable();
        // the new table is displayed based on the new state of the array
        displayBooks(books);
    }
    // clicking status icon
    else if (event.target.classList.contains('status-btn')) {
        // book that is associated with this row has it's status changes
        books[event.target.dataset.index].toggleStatus();
        // the current displaying table is clearead
        clearTable();
        // the new table is displayed based on the new state of the array
        displayBooks(books);
    }
})
