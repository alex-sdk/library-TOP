//todo: Implement local storage properly
//todo: fix remove button
//todo: display cards properly by not making same cards

let myLibrary = [];

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const submitButton = document.querySelector('.submit-btn');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector("#modal");
        document.getElementById('Author').value = "";
        document.getElementById('Title').value = "";
        document.getElementById('Genre').value = "";
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

submitButton.addEventListener('click', () => {
    getInput()
    displayBooks(myLibrary)
});

function getInput() {
    const Author = document.getElementById("Author").value;
    const Title = document.getElementById("Title").value;
    const Genre = document.getElementById("Genre").value;
    addBookToLibrary(Author, Title, Genre)
}
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
    for (let i = 0; i < Arr.length; i++) {
        const card = document.createElement('div');
        card.classList = 'card';
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
        buttonRead.innerText = 'Not Read';
        buttonRead.classList = 'notRead';
        card.appendChild(buttonRead);
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        card.appendChild(removeButton);

        buttonRead.addEventListener('click', () => {
            if (buttonRead.innerText == 'Read') {
                buttonRead.innerText = 'Not Read';
                buttonRead.classList.remove('read')
                buttonRead.classList = 'notRead';
            } else {
                buttonRead.classList = 'read';
                buttonRead.classList.remove('notRead');
                buttonRead.innerText = 'Read';
            }
        });

        removeButton.addEventListener('click', () => {

        });
    }
}
function setData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));    
}
    
function restore() {
    if (!localStorage.myLibrary) {
        displayBooks(myLibrary)
    }else {
        let objects =localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks(myLibrary)
        }
}
restore()
