"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(5432,  ()=> console.log(`Started on ${PORT}`));
