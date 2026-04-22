const resultsEl = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const paginationEl = document.getElementById("pagination");
const allBooksBtn = document.getElementById("allBooksBtn");

let currentPage = 1;

// SEARCH
searchBtn.addEventListener("click", () => {
  currentPage = 1;
  loadBooks(false);
});

// SORT CHANGE
sortSelect.addEventListener("change", () => {
  currentPage = 1;
  loadBooks(false);
});

// ALL BOOKS BUTTON
allBooksBtn.addEventListener("click", () => {
  searchInput.value = "";
  currentPage = 1;
  loadBooks(true);
});

async function loadBooks(all = false) {
  const name = searchInput.value;
  const sort = sortSelect.value;

  let url = `http://localhost:3000/api/product?sort=${sort}`;

  if (name) {
    url += `&name=${name}`;
  }

  if (!all) {
    url += `&page=${currentPage}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  renderBooks(data.results);

  if (!all) {
    renderPagination(data.page, data.totalPages);
  } else {
    paginationEl.innerHTML = "<p>Showing all books</p>";
  }
}

function renderBooks(books) {
  resultsEl.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${book.image}" />
      <h3>${book.title}</h3>
      <p>${book.price}</p>
    `;

    resultsEl.appendChild(card);
  });
}

function renderPagination(page, totalPages) {
  paginationEl.innerHTML = `
    <button onclick="prevPage()" ${page === 1 ? "disabled" : ""}>
      Prev
    </button>

    <span>Page ${page} of ${totalPages}</span>

    <button onclick="nextPage()" ${page === totalPages ? "disabled" : ""}>
      Next
    </button>
  `;
}

function nextPage() {
  currentPage++;
  loadBooks(false);
}

function prevPage() {
  currentPage--;
  loadBooks(false);
}

// INIT
loadBooks(false);