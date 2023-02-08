
/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const LOCAL_PORT = 3001;
const PORT = +process.env.PG_PORT || 3001;
const DATABASE = process.env.PG_DATABASE || 'jobly';
const USER = process.env.PG_USER || 'postgres';
const PASSWORD = process.env.PG_PASSWORD || 'password';
const HOST = process.env.PG_HOST || '127.0.0.1';


// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "postgresql://postgres:password@localhost:5432/jobly_test"
      : `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
}
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  LOCAL_PORT, SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  DATABASE,
  getDatabaseUri,
};
