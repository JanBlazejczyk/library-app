// create two separate arrays for books read and books to read
let books = [];

// constructor to create book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleStatus = function () {
    if (this.read === "Read") {
        this.read = "Not read";
    }
    else if (this.read === "Not read") {
        this.read = "Read";
    }
}

// Adds the book object to the correct array, depending on the status
Book.prototype.addToArray = function () {
    books.push(this);
}

// gathers user's input from the form and returns the new book object
function getBookFromForm() {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value;
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
    let booksToReadPlaceholder = document.querySelector(".display-books-to-read");
    let booksReadPlaceholder = document.querySelector(".display-books-read");

    // for every book in booksToRead array
    for (let book of books) {
        let bookIndex = books.indexOf(book);
        // create a table row to store book info and add it to the table
        let row = document.createElement("tr");
        // add a data atribute to the row with the index of the element in an array
        row.setAttribute("data-index", bookIndex);
        // for every property in a book object
        for (let property in book) {
            let cell = document.createElement("td");
            // iterate only properties of the constructor
            if (book.hasOwnProperty(property)) {
                if (property === "read") {
                    let statusBtn = document.createElement("button");
                    statusBtn.setAttribute("data-index", bookIndex);
                    statusBtn.classList.add("status-btn");
                    if (book.read === "Not read") {
                        statusBtn.textContent = "Finished it!";
                    }
                    else if (book.read === "Read") {
                        statusBtn.textContent = "Not finished?";
                    }

                    cell.appendChild(statusBtn);
                    row.appendChild(cell);
                }
                else {
                    cell.textContent = book[property];
                    row.appendChild(cell);
                }
            }
        }
        // here stuff becomes different for read and not read 
        if (book.read === "Read") {
            booksReadPlaceholder.appendChild(row);
        }
        else if (book.read === "Not read") {
            booksToReadPlaceholder.appendChild(row);
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

    // create an icon and give and it a data-row-num attribute associated with the row that it's in
    deleteBtnPlaceholder.innerHTML = `<i class="bi bi-x-lg delete-btn" data-index="${bookIndex}"></i>`;

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
// the book is stored in an array
// the table is clearead
// the new table is displayed with the new book in it
const submitBtn = document.getElementById("add-book");
submitBtn.addEventListener('click', () => {
    // addBookToLibrary();
    let newBook = getBookFromForm();
    newBook.addToArray();
    clearTable();
    displayBooks(books);
})

const tables = document.querySelector(".all-books");
tables.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        books.splice(event.target.dataset.index, 1);
        clearTable();
        displayBooks(books);
    }
    else if (event.target.classList.contains('status-btn')) {
        // book that is associated with this row has it's status changes
        books[event.target.dataset.index].toggleStatus();
        clearTable();
        displayBooks(books);
    }
})
