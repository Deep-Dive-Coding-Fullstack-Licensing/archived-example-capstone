import postgres from 'postgres'

export const sql = postgres({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  transform: {
    column: {
      from: postgres.toCamel, to: postgres.fromCamel
    }
  }
})
