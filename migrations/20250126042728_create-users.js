/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "users";
exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid());
    table.primary("id");
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.timestamp("email_verified");
    table.text("password").notNullable();
    table.text("image");
    table
      .enu("status", ["active", "suspend by admin"])
      .notNullable()
      .defaultTo("active");
    table.enu("role", ["admin", "user"]).notNullable().defaultTo("user");
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableName);
};
