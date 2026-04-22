# 📚 Book Price Tracker

A web scraping project that collects book data from **Books to Scrape**, sorts prices, and provides a simple API and frontend interface to browse books dynamically.

---

## 🚀 Live Demo

(Add your deployed links here after deployment)

- Frontend: https://your-frontend-url.com  
- Backend API: https://your-backend-url.com/api/product  

---

## 📌 Features

- 📖 Scrapes real book data from a live website  
- 💰 Sort books by price (ascending / descending)  
- 🔎 Search books by title  
- 📄 Pagination support  
- 📚 View all books at once (All Books mode)  
- 🖼️ Displays book images  
- ⚡ REST API built with Express  
- 🤖 Automated scraping using Puppeteer  

---

## 🧠 Tech Stack

**Backend:**
- Node.js
- Express.js
- Puppeteer
- CORS

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

---

## 📂 Project Structure

price-tracker-api/
├── src/
│   ├── routes/
│   │   └── productRoutes.js
│   ├── services/
│   │   └── scraper.js
│   ├── server.js
│
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
│
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/your-username/price-tracker-api.git

---

### 2. Install dependencies

npm install

---

### 3. Run the server

node src/server.js

Server will run at:
http://localhost:3000

---

## 🔌 API Endpoints

### Get all books
GET /api/product

---

### Search books
GET /api/product?name=harry

---

### Sort books
GET /api/product?sort=asc  
GET /api/product?sort=desc  

---

### Pagination
GET /api/product?page=1&limit=20

---

## 📸 Features Preview

- Book cards with image, title, and price  
- Sorting by cheapest or most expensive  
- Search functionality  
- Pagination system  
- “All Books” mode (no pagination)  

---

## 🧩 How It Works

1. Puppeteer scrapes data from Books to Scrape website  
2. Extracts title, price, and image  
3. Express API processes filtering, sorting, pagination  
4. Frontend displays everything dynamically  

---

## 🚀 Future Improvements

- Add database caching (MongoDB / Redis)  
- Add favorites system  
- Improve UI with React  
- Deploy full stack with CI/CD  
- Add multi-site comparison scraping  

---

## 👨‍💻 Author

João Abdala
