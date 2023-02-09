"use strict";

const app = require("./app");
const { APP_PORT } = require("./config");

app.listen(APP_PORT,  ()=> console.log(`Started on ${process.env.DATABASE_URL}:${APP_PORT}`));
