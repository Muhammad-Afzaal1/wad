
# Library API — Assignment 1 Solution

Simple Express-based library API that serves a small catalog of books from a local in-memory dataset (`data.js`). This project provides endpoints to list all books, filter by author, and list available or issued books.

## Contents

- `index.js` — Express server and API routes
- `data.js` — sample book dataset exported as `libraryBooks`
- `package.json` — project metadata and dependencies

## Requirements

- Node.js (v14+ recommended)
- npm (or yarn)

## Install

Clone or download the project and install dependencies:

```bash
npm install
```

## Run the server

You can run the server with Node or optionally with nodemon (installed as a dependency):

```bash
node index.js
# or, for automatic restarts while developing
npx nodemon index.js
```

When running, the server listens on port 3000 and will print `server is running` to the console.

## API Endpoints

Base URL: http://localhost:3000

- GET /api/books/
	- Description: Returns the full list of books. Optionally filter by author using the `author` query parameter.
	- Query parameters:
		- `author` (optional) — filter books whose `author` field exactly matches the provided value.
	- Example:

```bash
curl "http://localhost:3000/api/books/"
curl "http://localhost:3000/api/books/?author=George%20Orwell"
```

- GET /api/books/available
	- Description: Returns only books where `is_available` is `true`.
	- Example:

```bash
curl http://localhost:3000/api/books/available
```

- GET /api/books/issued
	- Description: Returns books where `is_available` is `false` (issued/unavailable books).
	- Example:

```bash
curl http://localhost:3000/api/books/issued
```

## Data format

Each book in the JSON responses has this shape:

```json
{
	"id": 1,
	"title": "To Kill a Mockingbird",
	"author": "Harper Lee",
	"is_available": true
}
```

The sample dataset is stored in `data.js` and exported as `libraryBooks`.
