# Product API – Week 2 Express Assignment

This repository contains my completed Week 2 assignment: a fully featured RESTful Product API built with Express.js. It showcases routing, middleware, validation, error handling, filtering, pagination, search, and basic analytics.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Variables](#environment-variables)
4. [Running the Server](#running-the-server)
5. [API Overview](#api-overview)
6. [Authentication](#authentication)
7. [Endpoints](#endpoints)
8. [Filtering & Pagination](#filtering--pagination)
9. [Sample Requests](#sample-requests)
10. [Testing Guide](#testing-guide)
11. [Project Structure](#project-structure)
12. [Resources](#resources)

---

## Prerequisites

- Node.js 18+
- npm 9+ (ships with Node 18)
- REST client (Postman, Insomnia, curl)

---

## Installation

```bash
git clone <your-assignment-repo>
cd express-js-server-side-framework-ONYANGO-ALGORE
npm install
```

---

## Environment Variables

Open `.env` and set your API key and desired port. The file ships with development-friendly defaults you can reuse locally.

Required variable:

| Name     | Description                    | Default        |
|----------|--------------------------------|----------------|
| PORT     | Server port for Express app    | `3000`         |
| API_KEY  | Used by auth middleware        | `dev-api-key`  |

---

## Running the Server

```bash
npm start
# or
node server.js
```

Server defaults to `http://localhost:3000`. Override the port via `PORT` in `.env`.

---

## API Overview

- Resource: `products`
- Data store: in-memory array (reset on restart)
- Formats: JSON requests/responses
- Versioning: single API, base path `/api`

---

## Authentication

All **write** operations (`POST`, `PUT`, `DELETE`) require a header:

```
x-api-key: <your API key>
```

Read operations do not require authentication.

---

## Endpoints


GET `/` message, points to `/api/products` 
GET `/api/products` List products (supports filter & pagination)
GET `/api/products/:id` Retrieve single product by ID 
POST `/api/products` Create product (auth + validation)
PUT `/api/products/:id` Update product (auth + validation)
DELETE `/api/products/:id` Remove product (auth) 
GET `/api/products/search` Search by name (`?q=term`)
GET `/api/products/stats` Aggregate stats (total, inventory, categories)

---

## Filtering & Pagination

`GET /api/products` supports:

- `?category=<string>` – filter by category (case-insensitive)
- `?page=<number>` – defaults to `1`
- `?limit=<number>` – defaults to `10`

Response structure:

```json
{
  "metadata": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  },
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "...": "..."
    }
  ]
}
```

---

## Sample Requests

### List products with filtering

```bash
curl "http://localhost:3000/api/products?category=electronics&page=1&limit=2"
```

### Search

```bash
curl "http://localhost:3000/api/products/search?q=phone"
```

### Create product

```bash
POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev-api-key" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Rechargeable mouse with silent clicks",
    "price": 35,
    "category": "electronics",
    "inStock": true
  }'
```

### Update product

```bash
PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev-api-key" \
  -d '{"price": 1150, "inStock": false}'
```

### Delete product

```bash
DELETE http://localhost:3000/api/products/1 \
  -H "x-api-key: dev-api-key"
```

### Stats

```bash
curl http://localhost:3000/api/products/stats
```

---

## Testing Guide

1. **Preparation**
   - Update `.env` and set `API_KEY`.
   - Run `npm start` and ensure console logs `Server is running...`.

2. **Read endpoints**
   - Hit `GET /api/products` to confirm metadata structure.
   - Add `category`, `page`, and `limit` to verify filtering/pagination.
   - Use `GET /api/products/search?q=lap` to test search validation (requires query string).

3. **Write endpoints**
   - Include `x-api-key` in headers.
   - Attempt invalid payloads (missing fields, wrong types) to verify validation errors (400).
   - Update/delete non-existing IDs to see 404 responses.

4. **Error handling**
   - Hit an unknown route (e.g., `/api/unknown`) to trigger 404 JSON error payload.
   - Remove `x-api-key` to confirm 401 response.

5. **Tools**
   - Use Postman collections or VS Code REST Client for repeatable tests.
   - Curl snippets above cover the main flows.

Since the data is in-memory, each server restart resets products to the seed data.

---

## Project Structure

```
.
├── controllers
│   └── productController.js
├── data
│   └── products.js
├── middleware
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validation.js
├── routes
│   └── products.js
├── utils
│   └── errors.js
├── server.js
├── package.json
├── package-lock.json
├── Week2-Assignment.md
├── README.md
└── .env
```

---

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)