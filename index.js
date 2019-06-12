document.addEventListener("DOMContentLoaded", () => {
  getBooks()

  const form = document.getElementById("add-book-form")
  form.addEventListener("submit", createBook)
})

function getBooks() {
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(res => 
    {res.forEach(book => populateBook(book))
  })
}

function createBook(e) {
  e.preventDefault()
  const form = document.getElementById("add-book-form")
  fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "title": e.target.title.value, 
      "img_url": e.target.img_url.value, 
      "description": e.target.description.value, 
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(populateBook)
  .then(form.reset())
}

function deleteBook(e) {
  fetch(`http://localhost:3000/books/${e.target.dataset.bookId}`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"}
  })
  .then(e.target.parentElement.remove())
  .then(document.getElementById(e.target.dataset.bookId).remove())
}

function populateBook(book) {
  const ul = document.getElementById("list")
  const li = document.createElement("li")

  li.id = book.id
  li.innerText = book.title

  li.addEventListener("click", () => {
    const showPanel = document.getElementById("show-panel")

    const h1 = document.createElement("h1")
    h1.innerText = book.title

    const img = document.createElement("img")
    img.src = book.img_url

    const p = document.createElement("p")
    p.innerText = book.description

    const likeButton = document.createElement("button")
    likeButton.innerText = "Likes: "

    const btn_span = document.createElement("span")
    btn_span.innerText = book.likes
    likeButton.append(btn_span)

    likeButton.addEventListener("click", () => {
      btn_span.innerText = parseInt(btn_span.innerText) + 1

      fetch(`http://localhost:3000/books/${book.id}`,{
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"likes": btn_span.innerText})
      })
    })

    const deleteButton = document.createElement("button")

    deleteButton.addEventListener("click", deleteBook)
    deleteButton.innerText = "Delete Book"
    deleteButton.id = "delete"
    deleteButton.dataset.bookId = book.id

    showPanel.innerHTML = ""
    showPanel.append(h1, img, p, likeButton, deleteButton)  
  })

  ul.append(li)
}