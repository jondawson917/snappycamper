"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;
console.log(getDatabaseUri());
if (process.env.NODE_ENV === "production") {
  
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri()
  });
}

db.connect();
/*Move to seed script */
db.query(`DROP TABLE users cascade;`);
db.query(`DROP TABLE camps cascade;`)
db.query(`DROP TABLE reservations cascade`);
db.query(`CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(45) UNIQUE,
  password TEXT NOT NULL,
  fullName TEXT NOT NULL,
  state VARCHAR(20),
  is_admin BOOLEAN NOT NULL DEFAULT false
);`)
db.query('CREATE TABLE camps (id serial PRIMARY KEY, parkCode VARCHAR(4) CHECK (parkCode = lower(parkCode)), parkName VARCHAR(45) NOT NULL, cost FLOAT CHECK (cost >=0) NOT NULL DEFAULT 0, image_url TEXT);');
db.query(`INSERT INTO users (username, password, fullName, state, is_admin)
VALUES ('testadmin',
        '$2b$12$ARsrVQBHATeA2WJBe0MvdOBXOxo8fcgAXH8NUm5FhTJxcLhWXGw.u',
        'Mark Bigham',
        'GA',
        TRUE),
       ('testuser',
        '$2b$12$ARsrVQBHATeA2WJBe0MvdOBXOxo8fcgAXH8NUm5FhTJxcLhWXGw.u', 'Tom Harrison',
        'CA',
        FALSE);`);
        
db.query(`CREATE TABLE reservations (
  id serial PRIMARY KEY,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  camp_id INTEGER REFERENCES camps (id) ON DELETE CASCADE
  );`);
module.exports = db;