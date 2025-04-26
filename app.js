// Our in-memory library
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a Book to the library array
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

// Render the library to the #book-list container
function renderLibrary() {
  const container = document.getElementById('book-list');
  container.innerHTML = '';  // clear existing

  myLibrary.forEach(book => {
    // Build card
    const card = document.createElement('div');
    card.classList.add('book-card');

    const titleEl = document.createElement('h2');
    titleEl.textContent = book.title;

    const authorEl = document.createElement('p');
    authorEl.textContent = `Author: ${book.author}`;

    const pagesEl = document.createElement('p');
    pagesEl.textContent = `Pages: ${book.pages}`;

    const readEl = document.createElement('p');
    readEl.textContent = `Status: ${book.read ? 'Read' : 'Not read yet'}`;

    // Assemble card
    card.append(titleEl, authorEl, pagesEl, readEl);
    container.appendChild(card);
  });
}

// Wait for DOM, then initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 App initialized');
  renderLibrary();
});

// Pre-populate some books
addBookToLibrary('The Hunger Games', 'Suzanne Collins', 374, true);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Dune', 'Frank Herbert', 412, false);
addBookToLibrary('Foundation', 'Isaac Asimov', 255, false);
