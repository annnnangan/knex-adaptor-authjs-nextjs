// Update with your config settings.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.local",
});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const production = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

module.exports = { development, production };
