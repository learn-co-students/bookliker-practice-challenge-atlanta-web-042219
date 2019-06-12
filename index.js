document.addEventListener('DOMContentLoaded', () => {
  fetchBooks()
})

function fetchBooks(){
  fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(sortBooks)
}

function sortBooks(book){
  // console.log(book)
  book.forEach(book => showBook(book))
}

function showBook(book){
  const ul = document.getElementById('list') 
  const li = document.createElement('li') 
  li.innerText = book.title 
  
  li.addEventListener('click', function() {
  const div = document.getElementById('show-panel') 
  // console.log(div)

  div.innerHTML =`  
  <h2>${book.title}</h2>
  <img src ="${book.img_url}"/>
  <p>${book.description}</p>
  <button id="like_book_btn" data-book-id="${book.id}" data-users="${book.users}" >Like Book</button> 
  <p id="current_book_likes">Likes: <span>${book.likes}</span></p>`
  
  div.addEventListener('click', handleLikes)
})
  
  ul.appendChild(li) 
}

function handleLikes(e){
      // console.log('liked', e)
      // console.log(e.target.parentElement.innerText)
      let likeValue = e.target.parentElement.querySelector('span').innerText
      // console.log(likeValue)
      let newValue = parseInt(likeValue)
      // console.log('does this work', newValue)
      let likeBox = e.target.parentElement.querySelector('span')
      // console.log(likeBox)
      likeBox.innerText = `${++newValue}`
      // console.log(e.target.dataset.bookId)
      let bookId = e.target.dataset.bookId
      
  fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'PATCH',
      body: JSON.stringify({"likes": newValue}),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    // .then(console.log)
    }