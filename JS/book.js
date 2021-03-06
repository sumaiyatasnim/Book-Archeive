const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const emptyError = document.getElementById('empty-error').style.display = 'none';
const errorUndefined = document.getElementById('undefined-error').style.display = 'none';
const bookCount = document.getElementById('book-count');

// searchField
const clickButton = () => {

    const searchField = searchInput.value;
    document.getElementById('empty-error').style.display = 'none'

    if (searchField === "") {
        document.getElementById('empty-error').style.display = 'block';
        bookContainer.textContent = '';
        bookCount.innerText = "";
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchField}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookResult(data))
        document.getElementById('empty-error').style.display = 'none';

    }
}
const displayBookResult = data => {
    //book count
    const numFoundResult = data.numFound;
    document.getElementById('undefined-error').style.display = 'none'
    if (numFoundResult === 0) {
        document.getElementById('undefined-error').style.display = 'block'
        emptyError.innerText = '';

    }
    bookCount.innerText = `Total books number: ${numFoundResult}`;
    // clear data
    searchInput.value = '';

    // show book details
    const books = data.docs;
    console.log(books);
    bookContainer.textContent = '';
    books.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
    <div class="card overflow-hidden border border-secondary p-2 mb-3">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg " class="card-img-top " " style="height: 500px; alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">Name: <span class="text-primary">${book.title}</span></h5>
            <h6 class="card-title">Author: <span class="text-secondary">${book.author_name}</span></h6>
            <h6 class="card-title">Publisher: <span class="text-success">${book.publisher}</span></h6>
            <h6 class="card-title">Publish Year: <span class="text-info">${book.publish_year}</span></h6>
            <h6 class="card-title">1st Publication: <span class="text-success">${book.first_publish_year}</span></h6>
         </div>
    </div>
            `;
        bookContainer.appendChild(div);
    });
};
