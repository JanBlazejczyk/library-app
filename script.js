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
        let bookIndex = myLibrary.indexOf(book);
        // create a table row to store book info and add it to the table
        let row = document.createElement("tr");
        // add a data-row-num atribute to the row with the index of the element in an array
        row.setAttribute("data-row-num", bookIndex);
        table.appendChild(row);
        // for every property in a book object
        for (let property in book) {
            let cell = document.createElement("td");
            cell.textContent = book[property];
            row.appendChild(cell);
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
    deleteBtn.setAttribute("data-row-num", bookIndex);
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtnPlaceholder.appendChild(deleteBtn);
}

// function for cleaning the table to display the current state of the table
function clearTable() {
    const tableBody = document.getElementById("display-books");
    // while tableBody has children, remove the first one
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
}

// onclick function for all the delete-btn
// it removes the given tr from the table
const allDeleteBtns = document.querySelectorAll(".delete-btn")





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

