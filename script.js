document.getElementById('fetch-books').addEventListener('click', fetchBooks);
document.getElementById('prev-page').addEventListener('click', prevPage);
document.getElementById('next-page').addEventListener('click', nextPage);

let books = [];
let currentPage = 1;
const itemsPerPage = 3;

function fetchBooks() {
    fetch('https://openlibrary.org/people/mekBot/books/already-read.json')
        .then(response => response.json())
        .then(data => {
            books = data.reading_log_entries;
            currentPage = 1;
            displayBooks();
            document.getElementById('pagination-buttons').style.display = 'block';
        })
        .catch(error => console.error('Error fetching books:', error));
}

function displayBooks() {
    const booksInfo = document.getElementById('books-info');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedBooks = books.slice(start, end);

    booksInfo.innerHTML = paginatedBooks.map(book => `
        <div class="book-item">
            <img src="https://covers.openlibrary.org/b/id/${book.work.cover_id}-L.jpg" alt="Book Cover">
            <p>${book.work.title}</p>
        </div>
    `).join('');

    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = end >= books.length;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayBooks();
    }
}

function nextPage() {
    if ((currentPage * itemsPerPage) < books.length) {
        currentPage++;
        displayBooks();
    }
}
