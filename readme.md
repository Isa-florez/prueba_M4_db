Description


This project is a basic REST API built with Node.js, Express, and PostgreSQL.


It allows you to:

    Create products

    List all products

    Search products

    Delete products

    Store a log (audit) when a product is deleted


This project was created to practice backend development and database connection.

Technologies Used

    Node.js

    Express

    PostgreSQL

    Postman (for testing)

Project Structure

isa/
│
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productsController.js
│   └── routes/
│       └── productsRoutes.js
│
├── .env
├── package.json
└── README.md

Installation


Download or clone the project


Navigate to the project folder.


Install dependencies

npm install

Environment Variables


Create a .env file in the root folder and add:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=inventory
DB_PASSWORD=1234
DB_PORT=5432

Change the values according to your PostgreSQL configuration.

🗄 Database Setup (PostgreSQL)


Create the required tables:

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    category_id INT REFERENCES categories(category_id),
    supplier_id INT REFERENCES suppliers(supplier_id)
);

CREATE TABLE deleted_products_log (
    log_id SERIAL PRIMARY KEY,
    product_id INT,
    sku VARCHAR(50),
    name VARCHAR(100),
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Running the Server


Start the server with:

node /home/cohorte5/isa/prueba_bases_de_datos/src

If everything is correct, you should see:

Server running on port 3000

API Endpoints


🔹 Get all products

GET http://localhost:3000/products

🔹 Create a product

POST http://localhost:3000/products


🔹 Search product by ID

GET http://localhost:3000/products/1

🔹 Delete a product

DELETE http://localhost:3000/products/1

When a product is deleted, it is stored in the deleted_products_log table.

Created by Isabella Florez Cano
