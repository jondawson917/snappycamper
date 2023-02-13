
/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const APP_PORT = 3001;
const PORT = +process.env.PG_PORT || 5432;
const DATABASE = process.env.PG_DATABASE_URL || 'snappycamper'
const USER = process.env.PG_USER || 'postgres';
const HOST = process.env.PG_HOST || 'localhost'
const PASSWORD = process.env.PG_PASSWORD || 'password';




// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? `postgresql://postgres:password@localhost:5432/snappycamper_test`
      : `postgresql://postgres:password@localhost:5432/snappycamper`;
}
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("SnappyCamper Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY, PORT,
  APP_PORT,
  BCRYPT_WORK_FACTOR,
  DATABASE,
  getDatabaseUri,
};
