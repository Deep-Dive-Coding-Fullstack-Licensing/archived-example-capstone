import { Pool, createPool, PoolConnection } from 'mysql2/promise'
let globalPool: Pool | undefined
export async function connect (): Promise<PoolConnection> {
  if (globalPool) {
    return await globalPool.getConnection()
  }
  globalPool = await createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    waitForConnections: true,
    namedPlaceholders: true
  })
  return await globalPool.getConnection()
}
