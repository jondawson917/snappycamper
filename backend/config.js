
/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");
const parseDbUrl = require("parse-database-url");

const dbConfig = parseDbUrl(process.env.DATABASE_URL.toString());
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const USER = dbConfig.user || 'postgres';; 
const PASSWORD = dbConfig.password || 'password';
const DATABASE = dbConfig.database || 'snappycamper';
const HOST = dbConfig.host || 'localhost';
const PORT = +dbConfig.port || 3001;



// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}_test`
      : process.env.DATABASE_URL || `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
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
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  DATABASE,
  getDatabaseUri,
};
