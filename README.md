# 📚 Book Price Tracker

A full-stack web application that scrapes book data from an external website and displays it in a clean, interactive frontend. The project demonstrates web scraping, REST API development, and frontend-backend integration with deployment.

---

## 🚀 Live Demo

- Frontend (Vercel): https://price-tracker-api-seven.vercel.app/
- Backend API (Render): https://price-tracker-api-e1rw.onrender.com/api/product

---

## 🧠 Project Overview

This project is a Book Price Tracker that allows users to:

- View a list of books scraped from an external website
- Search books by name
- Sort books by price (ascending or descending)
- Use pagination
- View book images, titles, and prices

The data is dynamically scraped from:
https://books.toscrape.com/

---

## 🏗️ Architecture

The project is split into two parts:

### 🔹 Backend (Node.js + Express + Puppeteer)
- Web scraping using Puppeteer + Chromium
- REST API to serve book data
- Filtering, sorting, and pagination logic
- Deployed on Render

### 🔹 Frontend (HTML, CSS, JavaScript)
- Simple responsive UI
- Fetches data from backend API
- Handles search, sorting, and pagination
- Displays book cards with images

Deployed on Vercel.

---

## ⚙️ Backend Features

- Puppeteer scraping from books.toscrape.com
- REST API endpoint:

GET /api/product

### Query parameters:
- name → filter books by title
- sort → asc or desc
- page → pagination
- limit → items per page

### Example response:
{
  "total": 20,
  "page": 1,
  "totalPages": 1,
  "results": [
    {
      "title": "Sapiens",
      "price": "£54.23",
      "image": "https://books.toscrape.com/media/cache/xx.jpg"
    }
  ]
}

---

## 💻 Frontend Features

- Search books by name
- Sort by price (cheapest / most expensive)
- Pagination system
- Display of book image, title, and price
- Responsive UI with card layout

---

## 🧪 Tech Stack

### Backend:
- Node.js
- Express
- Puppeteer-core
- @sparticuz/chromium
- CORS

### Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla)

### Deployment:
- Render (Backend)
- Vercel (Frontend)

---

## 🔗 API Integration

Frontend communicates with backend via:

https://price-tracker-api-e1rw.onrender.com/api/product

---

## 📦 Installation (Local Setup)

### 1. Clone repository
git clone https://github.com/your-username/price-tracker-api.git

### 2. Backend setup
cd backend
npm install
node src/server.js

### 3. Frontend setup
Just open index.html in browser or use Live Server.

---

## 📈 Key Learnings

- Web scraping with Puppeteer in production
- Handling dynamic content extraction
- Building REST APIs with Express
- Connecting frontend and backend
- Deploying full-stack apps (Render + Vercel)
- Handling CORS and API integration issues

---

## ⚠️ Notes

- Data is scraped from a public demo site (books.toscrape.com)
- Images require proper URL normalization for production
- Backend must be deployed separately from frontend

---

## 👨‍💻 Author

João Abdala  
Project built for learning full-stack development, scraping, and deployment workflows.

---

## 📌 Future Improvements

- Add caching layer for scraped data
- Improve UI/UX with animations
- Add categories and filters
- Store data in a database (MongoDB or PostgreSQL)
