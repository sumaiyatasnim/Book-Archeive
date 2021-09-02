//error messeges handale
const errorMsgNull = document.getElementById('error-msg-incorrect').style.display = 'none'
const errorMsgUndifined = document.getElementById('error-msg-undifined').style.display = 'none'
//search button handale and show book results
const searchBook = () => {
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-msg-incorrect').style.display = 'none';
    if (searchText === '') {
        document.getElementById('error-msg-incorrect').style.display = 'block';
        document.getElementById('search-result').textContent = '';
        document.getElementById('total-search').innerText = '';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookResult(data))
        document.getElementById('error-msg-incorrect').style.display = 'none';
    }
}

const displayBookResult = data => {
    //total book result
    const searchTotal = document.getElementById('total-search')
    const numFoundResult = data.numFound;
    document.getElementById('error-msg-undifined').style.display = 'none'
    if (numFoundResult === 0) {
        document.getElementById('error-msg-undifined').style.display = 'block'
        document.getElementById('error-msg-incorrect').innerText = '';

    }
    searchTotal.innerText = `Book result found:${numFoundResult}`;

    //book item
    const docs = data.docs;
    console.log(data)

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    docs.forEach(doc => {

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="col ">
     <div class="card ">
       <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg " class="card-img-top  " style="height: 400px; alt="...">
       <div class="card-body">
         <h6 class="card-title">Book Name: <spain class="text-info">${doc.title}</spain></h6>
         <h6>publish year:<spain class="text-danger">${doc.first_publish_year}</h6></spain>
         <h6 class="card-text">publisher name:<spain class="text-success">${doc.publisher}</h6></spain>
       </div>
     </div>
   </div>
     `
        searchResult.appendChild(div);
    })
}