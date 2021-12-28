function Book(title, author, pages, read) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.index;
}

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#readStatus");

let myLibrary = [{

}];

// function displayBooks(arr, book) {
//     for(let i = 0; i < arr.length; i++) {
//         addBookToList(myLibrary, book);
//     }
// }

// function createBook() {
//     let book = new Book(title.value, author.value, pages.value, read.checked);

//     return book;
// }

function addBookToList(arr, book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement('tr');

    row.innerHTML =
        `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><a href="#" class="btn btn-info btn-sm readStatus readBtn" id="readBtn">${book.read}</a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);

    // Push the book into the array and assign it an index
    // Find a way to associate an element's index with the ability to change it's read status and to delete it from the array
    arr.push(book);
    for (let i = 0; i < arr.length; i++) {
        arr[i].index = i;
    }
    console.log(book.read);
}

function clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#readStatus').checked = false;
}

function deleteBook(el) {
    if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }
}
// Clean this function up
function changeReadStatus(el, arr) {
    if (el.classList.contains('readBtn')) {
        if (el.innerText === 'true') {
            el.innerText = 'false';
        } else {
            el.innerText = 'true';
        }
    }
    let title = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
    let index = (getIndex(title, arr));
    
    arr[index].read = !arr[index].read;
}

function getIndex(title, arr) {
    const index = arr.findIndex(function (book) {
        return book.title === title;
    });

    return index;
}

// Event: Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {
    e.preventDefault();

    let book = new Book(title.value, author.value, pages.value, readStatus.checked);

    addBookToList(myLibrary, book);
    clearFields();
})

// Event: Change a Book's Read Status
if (document.querySelector("#readBtn") != null) {
    let readBtn = document.querySelector("#readBtn");
    if (readBtn != null) {
        readBtn.addEventListener('click', (e) => {
            console.log("Don touch me bitch!");
            changeReadStatus(e.target, myLibrary);
        })
    }
}

document.querySelector("#book-list").addEventListener('click', (e) => {
    changeReadStatus(e.target, myLibrary);
})

// Event: Delete a Book
document.querySelector("#book-list").addEventListener('click', (e) => {
    deleteBook(e.target);
})