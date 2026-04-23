const searchInput = document.getElementById('searchInput');
const resultsEl = document.getElementById('results');
const paginationEl = document.getElementById('pagination');
const cheapestBtn = document.getElementById('cheapestBtn');
const expensiveBtn = document.getElementById('expensiveBtn');
const statsBar = document.getElementById('stats-bar');

let currentPage = 1;
let currentSort = 'asc';
let searchTimer = null;

cheapestBtn.addEventListener('click', () => {
  currentSort = 'asc';
  cheapestBtn.classList.add('active');
  expensiveBtn.classList.remove('active');
  currentPage = 1;
  loadBooks();
});

expensiveBtn.addEventListener('click', () => {
  currentSort = 'desc';
  expensiveBtn.classList.add('active');
  cheapestBtn.classList.remove('active');
  currentPage = 1;
  loadBooks();
});

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentPage = 1;
    loadBooks();
  }, 400);
});

async function loadBooks() {
  const name = searchInput.value.trim();
  const status = document.getElementById('status');

  resultsEl.innerHTML = '';
  paginationEl.innerHTML = '';
  status.innerHTML = "<p class='loading'>Loading books…</p>";
  statsBar.classList.add('hidden');

  let url = `https://price-tracker-api-e1rw.onrender.com/api/product?sort=${currentSort}&page=${currentPage}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || !data.results.length) {
      status.innerHTML = "<p class='empty'>No books found 📭</p>";
      return;
    }

    status.innerHTML = '';
    renderStats(data.results);
    renderBooks(data.results);
    renderPagination(data.page, data.totalPages);

  } catch (err) {
    status.innerHTML = "<p class='error'>⚠️ Error loading books. API may be offline.</p>";
  }
}

function renderStats(books) {
  const prices = books
    .map(b => parseFloat(b.price?.replace(/[^0-9.]/g, '') || 0))
    .filter(p => p > 0);

  if (!prices.length) return;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  document.getElementById('statCount').textContent = books.length;
  document.getElementById('statMin').textContent = `£${min.toFixed(2)}`;
  document.getElementById('statMax').textContent = `£${max.toFixed(2)}`;
  document.getElementById('statAvg').textContent = `£${avg.toFixed(2)}`;
  statsBar.classList.remove('hidden');
}

function renderBooks(books) {
  books.forEach((book, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${i * 40}ms`;

    const inStock = book.availability?.toLowerCase().includes('in stock');
    const stockClass = inStock ? 'in-stock' : 'out-stock';
    const stockLabel = inStock ? '✓ In Stock' : '✕ Out of Stock';

    const rating = typeof book.rating === 'number'
      ? '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating))
      : '★★★☆☆';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${book.image || ''}" alt="${book.title || 'Book cover'}" loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x400/0f1623/7a8499?text=No+Cover'">
        <div class="price-badge">${book.price || '—'}</div>
        <div class="rating-badge">${rating}</div>
      </div>
      <div class="card-body">
        <p class="card-title">${book.title || 'Untitled'}</p>
        <div class="card-meta">
          <span class="availability ${stockClass}">${stockLabel}</span>
        </div>
      </div>
    `;

    resultsEl.appendChild(card);
  });
}

function renderPagination(page, totalPages) {
  if (!totalPages || totalPages <= 1) return;

  const makeBtn = (label, pg, isActive = false) => {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (isActive ? ' active' : '');
    btn.textContent = label;
    if (!isActive) {
      btn.addEventListener('click', () => {
        currentPage = pg;
        loadBooks();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    return btn;
  };

  if (page > 1) paginationEl.appendChild(makeBtn('← Prev', page - 1));

  const pages = new Set([1, totalPages, page, page - 1, page + 1].filter(p => p >= 1 && p <= totalPages));
  let last = null;
  [...pages].sort((a, b) => a - b).forEach(pg => {
    if (last && pg - last > 1) {
      const dots = document.createElement('span');
      dots.textContent = '…';
      dots.style.color = 'var(--muted)';
      paginationEl.appendChild(dots);
    }
    paginationEl.appendChild(makeBtn(pg, pg, pg === page));
    last = pg;
  });

  if (page < totalPages) paginationEl.appendChild(makeBtn('Next →', page + 1));
}

loadBooks();