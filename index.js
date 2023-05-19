let bookNameRef = document.getElementById("book-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//function to fetch data from api

let getBook = () => {
    let bookName = bookNameRef.value;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;
    //if input field is empty

    if (bookName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a book name </h3>`;
    }

    //if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if book exist in database
            if (data.totalItems > 0) {
                let book = data.items[0].volumeInfo;
                result.innerHTML = `
                    <div class="info">
                        <img src=${book.imageLinks.thumbnail} class="poster">
                        <div>
                            <h2>${book.title}</h2>
                            <div class="details">
                                <span>${book.publishedDate}</span>
                                <span>${book.pageCount} pages</span>
                            </div>
                            <div class="genre">
                                <div>${book.categories.join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Description:</h3>
                    <p>${book.description}</p>
                    <h3>Authors:</h3>
                    <p>${book.authors.join(", ")}</p>
                    
                `;
            }

            //if book doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">Book not found</h3>`;
            }
        })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getBook);
window.addEventListener("load", getBook);