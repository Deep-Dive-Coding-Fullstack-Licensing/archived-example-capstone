import {createPool, Pool} from 'mysql2/promise';
require('dotenv').config();

let globalPool: Pool | undefined = undefined

export async function connect () : Promise<Pool> {
  if (globalPool){
    return globalPool
  }
  globalPool = await createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    namedPlaceholders: true
  });
  return globalPool
}