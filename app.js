let myLibrary = [];
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const submitButton = document.querySelector('.submit-btn');
const bookGrid = document.querySelector('.bookGrid');
const inputs = document.querySelectorAll('input');

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

submitButton.addEventListener('click', () => {
    let validForm = Boolean;
    if (inputs.item(0).checkValidity() == false || inputs.item(1).checkValidity() == false || inputs.item(2).checkValidity() == false) {
                validForm = false;
    } else {
            validForm = true;
        }
    if (validForm) {
    addBookToLibrary()
    appendBook(myLibrary)
    document.getElementById('Author').value = "";
    document.getElementById('Title').value = "";
    document.getElementById('Genre').value = "";
    setData()
    }
});

function openModal(modal) {
    modal.classList.add('active');
    overlay.classList.add('active');
}
function closeModal(modal) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
function Book(Author, Title, Genre, isRead) {
    this.Author = Author;
    this.Title = Title;
    this.Genre = Genre;
    this.isRead = isRead;
}
function addBookToLibrary() {
    const Author = document.getElementById("Author").value;
    const Title = document.getElementById("Title").value;
    const Genre = document.getElementById("Genre").value;
    const isRead = document.getElementById("Read").value
    const book = new Book(Author, Title, Genre, isRead);
    myLibrary.push(book);
}
function appendRemoveButton(card, removeButton) {
    removeButton.innerText = 'Remove';
    card.appendChild(removeButton);
}
function appendReadButton(card, buttonRead, Arr, i) {
    if (Arr[i].isRead == "Yes") {
        buttonRead.innerText = 'Read';
        buttonRead.classList = 'read';
    }else {
        buttonRead.innerText = 'Not Read';
        buttonRead.classList = 'notRead';
    }  
    card.appendChild(buttonRead);
}
function appendGenre(card, contentGenre, Arr, i) {
    contentGenre.innerText = Arr[i].Genre;
    card.appendChild(contentGenre);
}
function appendTitle(card, contentTitle, Arr, i) {
    contentTitle.innerText = Arr[i].Title;
    card.appendChild(contentTitle);
}
function appendAuthor(card, contentAuthor, Arr, i) {
    contentAuthor.innerText = Arr[i].Author;
    card.appendChild(contentAuthor);
}
function appendCard(card, bookGrid) {
    card.classList = 'card';
    bookGrid.appendChild(card);
}
function appendBook(Arr) {
    const card = document.createElement('div');
    const removeButton = document.createElement('button');
    const buttonRead = document.createElement('button');
    const contentGenre = document.createElement('div');
    const contentAuthor = document.createElement('div');
    const contentTitle = document.createElement('div');
    
    appendCard(card, bookGrid)
    appendAuthor(card, contentAuthor, Arr, Arr.length - 1)
    appendTitle(card, contentTitle, Arr, Arr.length - 1)
    appendGenre(card, contentGenre, Arr, Arr.length - 1)
    appendReadButton(card, buttonRead, Arr, Arr.length - 1)
    appendRemoveButton(card, removeButton)
    changeReadStatus(buttonRead, Arr, Arr.length - 1)
    removeButtonEvent(card, removeButton, Arr, Arr.length - 1)
}
function displayAllBooks(Arr) {
    for (let i = 0; i < Arr.length; i++) {
        const card = document.createElement('div');
        const removeButton = document.createElement('button');
        const buttonRead = document.createElement('button');
        const contentGenre = document.createElement('div');
        const contentAuthor = document.createElement('div');
        const contentTitle = document.createElement('div');
        
        appendCard(card, bookGrid)
        appendAuthor(card, contentAuthor, Arr, i)
        appendTitle(card, contentTitle, Arr, i)
        appendGenre(card, contentGenre, Arr, i)
        appendReadButton(card, buttonRead, Arr, i)
        appendRemoveButton(card, removeButton)
        changeReadStatus(buttonRead, Arr, i)
        removeButtonEvent(card, removeButton, Arr, i)
    }
}
function removeButtonEvent(card, removeButton, Arr, i) {
    removeButton.addEventListener('click', () => {
        bookGrid.removeChild(card);
        Arr.splice(Arr.length - 1)
        setData()
    });
}
function changeReadStatus(buttonRead, Arr, i){
    buttonRead.addEventListener('click', () => {
        if (buttonRead.innerText == 'Read') {
            buttonRead.innerText = 'Not Read';
            buttonRead.classList.remove('read')
            buttonRead.classList = 'notRead';
            Arr[i].isRead = "No";
        } else {
            buttonRead.classList = 'read';
            buttonRead.classList.remove('notRead');
            buttonRead.innerText = 'Read';
            Arr[i].isRead = "Yes";
        }
        setData()
    });
}
function setData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));    
} 
function restore() {
    if (!localStorage.myLibrary) {
        displayAllBooks(myLibrary)
    }else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayAllBooks(myLibrary)
    }
}
restore()