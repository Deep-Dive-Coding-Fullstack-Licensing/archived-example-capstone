const postgres = require('postgres')

export const sql = postgres({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    transform: {
      table: { to: postgres.fromCamel, from: postgres.toCamel },
      column: { to: postgres.fromCamel, from: postgres.toCamel }
    }
  })
