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

// Add a Book to the library array, returns the new book
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

// Create a DOM element for a book card
function createBookCard(book) {
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

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    removeBookFromLibrary(book.id);
    card.remove();
  });

  card.append(titleEl, authorEl, pagesEl, readEl, deleteBtn);
  return card;
}

// Render the entire library to the #book-list container
function renderLibrary() {
  const container = document.getElementById('book-list');
  container.innerHTML = '';
  myLibrary.forEach(book => {
    const card = createBookCard(book);
    container.appendChild(card);
  });
}

// Append only one book to the #book-list container
function renderBook(book) {
  const container = document.getElementById('book-list');
  const card = createBookCard(book);
  container.appendChild(card);
}

// Wait for DOM, then initialize
document.addEventListener('DOMContentLoaded', () => {
  const newBookBtn = document.getElementById('new-book-btn');
  const modal = document.getElementById('book-form-modal');
  const bookForm = document.getElementById('book-form');
  const cancelBtn = document.getElementById('cancel-btn');

  // Show form
  newBookBtn.addEventListener('click', () => {
    modal.classList.add('show');
  });

  // Hide & reset form
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    bookForm.reset();
  });

  // Handle form submission: add, render single book, close form
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = parseInt(document.getElementById('pages').value, 10);
    const read = document.getElementById('read').checked;

    const newBook = addBookToLibrary(title, author, pages, read);
    renderBook(newBook);

    modal.classList.remove('show');
    bookForm.reset();
  });

  // Pre-populate some books
  addBookToLibrary('The Hunger Games', 'Suzanne Collins', 374, true);
  addBookToLibrary('1984', 'George Orwell', 328, true);
  addBookToLibrary('Dune', 'Frank Herbert', 412, false);
  addBookToLibrary('Foundation', 'Isaac Asimov', 255, false);

  // Initial render of pre-populated books
  renderLibrary();
});
