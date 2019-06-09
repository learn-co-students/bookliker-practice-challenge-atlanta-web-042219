document.addEventListener("DOMContentLoaded", function() {
	const CURRENT_USER = {id: 1, username: 'ASAllen67'}

	fetch_books()
	document.addEventListener('click', handleClickEvents)


	function handleClickEvents(e) {
		if(e.target.id === 'read_book_btn')
			read_book_clicked(e.target.dataset.bookId)
	}

	function read_book_clicked(id) {
		fetch(`http://localhost:3000/books/${id}`)
		.then(resp => resp.json())
		.then(book => {

			let user_already_liked = false
			book.users.forEach(user => {
				if(user.id === CURRENT_USER.id)
					user_already_liked = true
			})
			
			if(user_already_liked)
				alert('You have already liked this book!')
			else {
				book.users.push(CURRENT_USER)
				fetch(`http://localhost:3000/books/${id}`,{
			    method: 'PATCH',
			    headers: { 'Content-Type':'application/json' },
			    body: JSON.stringify({users: book.users})
  			})
  			let likes = document.querySelector('#current_book_likes span')
  			likes.innerText = parseInt(likes.innerText)+1
			}
		})
	}

	function fetch_books() {
		return fetch('http://localhost:3000/books')
		.then(resp => resp.json())
		.then(json => json.forEach(list_book) )
	}

	function list_book(book) {
		const ul = document.getElementById('list')
		const li = document.createElement('li')
		li.innerText = book.title

		li.addEventListener('click', function(){
			const div = document.getElementById('show-panel')

			user_ids = ''
			book.users.forEach(user => user_ids += `${user.id},`)

			div.innerHTML = `
			<h2>${book.title}</h2>
			<img src="${book.img_url}"/>
			<p>${book.description}</p>
			<button id="read_book_btn" data-book-id="${book.id}">Like this book!</button>
			<p id="current_book_likes">Likes: <span>${book.users.length}</span></p>`
		})
		ul.appendChild(li)
	}

	// END
});
