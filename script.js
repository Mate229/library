const myLibrary = [];

// Object constructor for the books....
function Book(title, author, page) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.page = page;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, page) {
    const book = new Book(title, author, page);
    myLibrary.push(book);
};

// I created some dummy books to visualize the display, might delete later.
addBookToLibrary("Ali", "mo", 29);
addBookToLibrary("Alid", "mot", 20);
addBookToLibrary("Alipo", "muo", 299);
addBookToLibrary("Aliang", "tsmo", 129);
addBookToLibrary("Alidfang", "tsfmo", 19);
addBookToLibrary("Adfang", "tsdffmo", 49);

const container = document.querySelector(".library-container");

function displayBook() {
    // Delete content of the display to make sure there is no double
    container.innerHTML = "";

    // Display the books in library
    for(let book of myLibrary) {

    const card = document.createElement("div");

    const titleT = document.createElement("h2")
    const authorT = document.createElement("h4")
    const pageT = document.createElement("p")

    titleT.textContent = book.title;
    authorT.textContent = book.author;
    pageT.textContent = book.page;

    card.append(titleT, authorT, pageT);

    container.appendChild(card);
    }
};
// First call of the display..
displayBook();


const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const cancelBtn = document.querySelector("#cancel-btn");
const submitBtn = document.querySelector("#submit-btn");

const addNewBookBtn = document.querySelector(".new-book");
addNewBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const bookTitle = document.querySelector("#book-title");
    const bookAuthor = document.querySelector("#book-author");
    const bookPage = document.querySelector("#book-pages");

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPage.value);

    // I recall this function here because, the created book won't appear on the display if I didn't recall
    displayBook();

    dialog.close();

    // Everytime I submitted, and I want to add a new one, the inputs were filled with the text I typed before, so I need to reset them.
    form.reset();
});