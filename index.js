        
        document.addEventListener("DOMContentLoaded", function() {
            fetchBooks()
        });

        function fetchBooks() {
                fetch("http://localhost:3000/books")
                .then(res => res.json())
                .then(data => populateBooks(data))
        }

        function populateBooks(books) {
            books.forEach(book => {populateBook(book)
            })
        }

        function populateBook(book) {
            const ul = document.getElementById("list")
            const li = document.createElement("li")
            li.innerText = book.title
                    li.addEventListener("click", function(){
                        const showPanel = document.getElementById("show-panel")
                        const h1 = document.createElement("h1")
                        h1.innerText = book.title
                        const img = document.createElement("img")
                        img.src = book.img_url
                        const p = document.createElement("p")
                        p.innerText = book.description
                        
                        const button = document.createElement("button")
                        button.innerText = "Likes: "
                        const buttonSpan = document.createElement("span")
                        buttonSpan.innerText = book.likes
                        button.append(buttonSpan)
                                button.addEventListener("click", function(){
                                    buttonSpan.innerText = parseInt(buttonSpan.innerText) + 1

                                    fetch(`http://localhost:3000/books/${book.id}`, {
                                        method: "PATCH",
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({"likes": buttonSpan.innerText})
                                    }).then(resp => resp.json())

                                })
                                showPanel.innerHTML = ""
                                showPanel.append(h1, img, p, button)

                    })


            ul.append(li)
        }
