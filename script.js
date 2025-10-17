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
addBookToLibrary("The Game of Life", "Florence Scovel Shinn", 139);
addBookToLibrary("The Goat of my Mother", "Ricardo Kaniama", 201);
addBookToLibrary("Kondo Le Requin", "Jean Pliya", 104);
addBookToLibrary("Le Prince", "Machiavel", 227);
addBookToLibrary("Man's Search for Meaning", "Viktor E. Frankl", 148);
addBookToLibrary("The Intelligent Investor", "Benjamin Graham", 641);

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
    pageT.textContent = `${book.page} pages`;

    card.append(titleT, authorT, pageT);

    // Add a delete button on each card.
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Book";

    // I set this attribute on the card to link it to the book directly
    card.setAttribute("dataId", book.id); 

    deleteBtn.addEventListener("click", () => {
        // Remove card from the display
        card.remove();

        // Remove book from the library. I first find the index of the book in the myLibrary and then remove it based on that index.
        const bookIndexInLibrary = myLibrary.findIndex(obj => obj.id === card.getAttribute("dataId"));
        if(bookIndexInLibrary !== -1) {
            myLibrary.splice(bookIndexInLibrary, 1);
        };
    });
    card.appendChild(deleteBtn);

    const statusBtn = document.createElement("button");
    statusBtn.textContent = "Mark Read";
    statusBtn.addEventListener("click", () => {
        statusBtn.textContent = "Read ✅";
        card.classList.add("book-read");
        statusBtn.disabled = true;
        book.markRead();
    })

    card.appendChild(statusBtn);

    container.appendChild(card);
    }
};
// First call of the display..
displayBook();

// I create this read function on Book prototype to be able to call it on each book.
Book.prototype.markRead = function() {
    this.status = "read";
}


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

// Dark-Light mode
const mode = document.querySelector(".icons");
const body = document.querySelector("body");
mode.addEventListener("click", () => {
    body.classList.toggle("dark")
});