document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
  document.addEventListener('click', handleClickEvents)

  function handleClickEvents(e) {
    if(e.target.id === 'read_book_btn') 
      readBookClicked(e.target.nextSibling.nextSibling) // holds the book id and user on line 38
  }
})

function readBookClicked(id) {
fetch('http://localhost:3000/books/${id}', {
  method: 'PATCH',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify({})
})
}

function fetchBooks() {
  return fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(json => json.forEach(listBooks)) //iterating over all books
}

function listBooks(book) {
  const ul = document.getElementById('list') // selecting part of the DOM by ID
  const li = document.createElement('li') // creating li within the selected ID
  li.innerText = book.title // adding book title in the innerText
  
  li.addEventListener('click', function() {
  const div = document.getElementById('show-panel') // selecting part of the DOM by ID
  console.log(div)
  div.innerHTML =`  
  <h2>${book.title}</h2>
  <img src ="${book.img_url}"/>
  <p>${book.description}</p>
  <button id="read_book_btn" data-book-id="${book.id}" data-users="${book.users}" >Read Book</button>` 
 // adding HTML to display book after event click
})
  
  ul.appendChild(li) // adding to DOM
}

