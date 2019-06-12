const URL_BOOKS = `http://localhost:3000/books`
const URL_USERS = `http://localhost:3000/users`
const list = document.querySelector('#list')
const panel = document.querySelector('#show-panel')
const loggedUser = "auer"
let likeUsers = []

document.addEventListener("DOMContentLoaded", function () {
  makeList()
  document.addEventListener("click", handleClick)
});

function makeList() {
  fetch(URL_BOOKS)
    .then(res => res.json())
    .then(books => books.forEach(displayBookList))
}

function displayBookList(book) {
  list.innerHTML += `<li data-id="${book.id}">${book.title}</li>`
}

function handleClick(e) {
  if (e.target.tagName === 'LI') showBook(e.target)
  if (e.target.id === 'like-button') handleLike(e.target)
}

function showBook(li) {
  likeUsers = []
  fetch(URL_BOOKS + `/${li.dataset.id}`)
    .then(res => res.json())
    .then(book => {
      book.users.forEach(user => likeUsers.push(user))
      displayBook(book)
    })
}

function displayBook(book) {
  let text = ''
  if (book.users.filter(user => (user.username === loggedUser)).length === 0) {
    text = `Like Book`
  } else {
    text = `Unlike Book`
  }
  panel.innerHTML = `<h2>${book.title}</h2>
                    <div><img src="${book.img_url}"></div>
                    <div><p>${book.description}</p></div>
                    <div id="like-status"></div>
                    <div><button id="like-button" data-id=${book.id} type="button">${text}</button > `
}

function handleLike(button) {
  // find user first
  fetch(URL_USERS)
    .then(res => res.json())
    .then(users => users.filter(user => (user.username === loggedUser))[0])
    .then(user => {
      if (button.innerText.includes('Unlike')) {
        button.innerText = 'Like Book'
        removeLike(user, button.dataset.id)
      } else {
        button.innerText = 'Unlike Book'
        addLike(user, button.dataset.id)
      }
    })
}

function addLike(user, id) {
  likeUsers.push(user)
  patchUsers(id)
}

function removeLike(user, id) {
  const index = likeUsers.indexOf(user)
  likeUsers.splice(index, 1)
  patchUsers(id)
}

function patchUsers(id) {
  fetch(URL_BOOKS + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      users: likeUsers
    })
  })
}