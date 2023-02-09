"use strict";

const app = require("./app");
const { APP_PORT } = require("./config");

app.listen(5432,  ()=> console.log(`Started on ${APP_PORT}`));
