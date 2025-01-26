/* eslint-disable @typescript-eslint/no-require-imports */
import Knex from "knex";
const config = require("../knexfile");

export const knex = Knex(config[process.env.NODE_ENV || "development"]);
