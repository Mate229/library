const myLibrary = [];

class Book {
    constructor(title, author, page) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.id = crypto.randomUUID();
    }

    addBookToLibrary() {
        myLibrary.push(this);
    }

    markRead() {
        this.status = "read";
    }
};

const container = document.querySelector(".library-container");

function displayBook() {

    // Display the books in library
    for(let book of myLibrary) {
        if (document.querySelector(`[dataId="${book.id}"]`) === null) { //This condition is to check wether the book is already displayed.. to avoid doubles..
            const card = document.createElement("div");

            const titleT = document.createElement("h2")
            const authorT = document.createElement("h4")
            const pageT = document.createElement("p")

            titleT.textContent = book.title;
            authorT.textContent = `by ${book.author}`;
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
}
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

    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPage.value);
    newBook.addBookToLibrary();

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