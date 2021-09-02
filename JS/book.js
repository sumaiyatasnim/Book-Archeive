const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-btn')
const bookContainer = document.getElementById('book-container')

// searchField
const clickButton = () => {
    const searchField = searchInput.value;
    const url = `https://openlibrary.org/search.json?q=javascript`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const api = data.docs;
            for (const book of api) {
                console.log(book)
            }
            // data.forEach(api => {
            //     console.log(api);
            // });
            const div = document.createElement("div")
            div.classList.add("col")
            div.innerHTML = `
    <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
         </div>
    </div>
            `;
            bookContainer.appendChild(div);
        });
};
clickButton()