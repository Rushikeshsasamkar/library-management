const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);

    const title = document.createElement("h3");
    title.textContent = book.title;
    bookCard.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    bookCard.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    bookCard.appendChild(pages);

    const readStatus = document.createElement("p");
    readStatus.textContent = `Read: ${book.read ? "Yes" : "No"}`;
    bookCard.appendChild(readStatus);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeBook(index));
    bookCard.appendChild(removeBtn);

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    toggleReadBtn.addEventListener("click", () => toggleReadStatus(index));
    bookCard.appendChild(toggleReadBtn);

    bookList.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

document.getElementById("newBookBtn").addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

document
  .getElementById("addBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, read);

    document.getElementById("addBookForm").reset();
    document.getElementById("modal").style.display = "none";
  });

// Manually add some initial books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
