//TODO Button functionality Not Read/Remove
//TODO Forum inputs/ submit button


let myLibrary = [];
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector("#modal");
        openModal(modal)
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal)
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal)
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
function Book(Author, Title, Genre) {
    this.Author = Author;
    this.Title = Title;
    this.Genre = Genre;
}
function addBookToLibrary(Author, Title, Genre) {
    const book = new Book(Author, Title, Genre);
    myLibrary.push(book);
}
function displayBooks(Arr) {
    const bookGrid = document.querySelector('.bookGrid');
    for (let i = 0; i < Arr.length; i++){
        const card = document.createElement('div');
        card.className = 'card';
        bookGrid.appendChild(card)
        
        const contentAuthor = document.createElement('div');
        contentAuthor.innerText = Arr[i].Author;
        card.appendChild(contentAuthor);
        
        const contentTitle = document.createElement('div');
        contentTitle.innerText = Arr[i].Title;
        card.appendChild(contentTitle);

        const contentGenre = document.createElement('div');
        contentGenre.innerText = Arr[i].Genre;
        card.appendChild(contentGenre);

        const buttonRead = document.createElement('button');
        buttonRead.innerText = 'Not read';
        card.appendChild(buttonRead);

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        card.appendChild(removeButton);
    }
}
addBookToLibrary(
    "J.K Rowling",
    "Harry Potter and The Chamber of Secrets",
    "Ficton"
);

addBookToLibrary(
    "George Orwell",
    "1984",
    "Science Fiction"
)

addBookToLibrary(
    "Ayn Rand",
    "Fountain Head",
    "Fiction"
)
displayBooks(myLibrary);