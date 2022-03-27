let myLibrary = [];
let validForm = null;

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
    inputs.forEach(input => { 
        validForm = input.checkValidity();
        if (!validForm) {
            return;
        }
    });
    if (validForm) {
    addBookToLibrary()
    appendCard(myLibrary)
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
function appendCard(Arr) {
        const card = document.createElement('div');
        card.classList = 'card';
        bookGrid.appendChild(card)
        
        const contentAuthor = document.createElement('div');
        contentAuthor.innerText = Arr[Arr.length -1].Author;
        card.appendChild(contentAuthor);
        
        const contentTitle = document.createElement('div');
        contentTitle.innerText = Arr[Arr.length - 1].Title;
        card.appendChild(contentTitle);

        const contentGenre = document.createElement('div');
        contentGenre.innerText = Arr[Arr.length - 1].Genre;
        card.appendChild(contentGenre);

        const buttonRead = document.createElement('button');
        if (Arr[Arr.length - 1].isRead == "Yes") {
            buttonRead.innerText = 'Read';
            buttonRead.classList = 'read';
        } else {
            buttonRead.innerText = 'Not Read';
            buttonRead.classList = 'notRead';
        }  
        card.appendChild(buttonRead);
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        card.appendChild(removeButton);

        buttonRead.addEventListener('click', () => {
            if (buttonRead.innerText == 'Read') {
                buttonRead.innerText = 'Not Read';
                buttonRead.classList.remove('read')
                buttonRead.classList = 'notRead';
                Arr[Arr.length - 1].isRead = "No";
            } else {
                buttonRead.classList = 'read';
                buttonRead.classList.remove('notRead');
                buttonRead.innerText = 'Read';
                Arr[Arr.length - 1].isRead = "Yes";
            }
            setData()
        });

        removeButton.addEventListener('click', () => {
            bookGrid.removeChild(card);
            delete Arr[Arr.length - 1];
            let newArr = Arr.filter(value => Object.keys(value).length !== 0);
            myLibrary = newArr;
            setData()
        });
}
function displayAllBooks(Arr) {
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
        if (Arr[i].isRead == "Yes") {
            buttonRead.innerText = 'Read';
            buttonRead.classList = 'read';
        } else {
            buttonRead.innerText = 'Not Read';
            buttonRead.classList = 'notRead';
        }  
        card.appendChild(buttonRead);
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        card.appendChild(removeButton);

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

        removeButton.addEventListener('click', () => {
            bookGrid.removeChild(card);
            delete Arr[i];
            let newArr = Arr.filter(value => Object.keys(value).length !== 0);
            myLibrary = newArr;
            setData()
        });
    }
}
function setData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));    
} 
function restore() {
    if (!localStorage.myLibrary) {
        displayAllBooks(myLibrary)
    }else {
        let objects =localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayAllBooks(myLibrary)
    }
}
restore()