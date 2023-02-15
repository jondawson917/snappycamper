'use strict';

/** Shared config for application; can be required many places. */

require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';
const APP_PORT = 3001;
const PORT = +process.env.RDS_PORT || 3001;
const DATABASE = process.env.RDS_DATABASE || 'snappycamper';
const USER = process.env.RDS_USER || 'postgres';
const HOST = process.env.RDS_HOST || '127.0.0.1';
const PASSWORD = process.env.RDS_PASSWORD || 'password';

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === 'test'
    ? 'postgres://postgres:password@127.0.0.1:5432/snappycamper_test'
    : `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('Green Thumb Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabaseUri());
console.log('---');

module.exports = {
  SECRET_KEY,
  PORT, APP_PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  LOCAL_PORT,
};
