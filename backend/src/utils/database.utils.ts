import { createPool, Pool } from 'mysql2/promise'

let globalPool: Pool | undefined

export async function connect (): Promise<Pool> {
  if (globalPool != null) {
    return globalPool
  }
  globalPool = await createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    namedPlaceholders: true
  })
  return globalPool
}
