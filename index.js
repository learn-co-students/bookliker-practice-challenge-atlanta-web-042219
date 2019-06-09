document.addEventListener("DOMContentLoaded", function() {

  const baseURL = `http://localhost:3000/books`
  document.addEventListener('click', handleClickEvents)

  fetchBooks()

  function fetchBooks() {
    fetch(baseURL)
    .then(res => res.json())
    // .then(console.log)
    .then(json => json.forEach(listBook))
  }

//----------------------------------------------------------------------------//

  function listBook(book) {
    console.log(book.users)

    const ul = document.getElementById('list')
    const li = document.createElement('li')

    li.innerText = book.title
    li.addEventListener('click', function(){
      const div = document.getElementById('show-panel')

      div.innerHTML =
        `<h2>${book.title}</h2>
        <img src="${book.img_url}"/>
        <p>${book.description}</p>
        <button id='read-book-button'>Read Book</button>
        <div id='data-set-div' data-book-id='${book.id}' data-users='${book.users}'></div>`
    })

    ul.appendChild(li)

  }

//----------------------------------------------------------------------------//

  function handleClickEvents(e) {
      console.log(e.target)
    if (e.target.id === 'read-book-button') readBookClicked(e.target.nextSibling.nextSibling)
    // e.target is the button / nextSibling is the button text / sibling after that is the div
  }

//----------------------------------------------------------------------------//

  function readBookClicked(id) {
    // console.log('readBookClicked', id)

    // fetch(`${baseURL}`/`${id}`,{
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify({ })
    // })
    
  }

// FINAL BRACKET -------------------------------------------------------------//

})
