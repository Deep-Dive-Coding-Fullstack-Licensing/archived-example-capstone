import { createPool, Pool } from 'mysql2/promise';
require('dotenv').config();

// Database connection. Can use config from .env file (based on example.env) or the defaults

export async function connect (): Promise<Pool> {

  const connection = await createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10,
    namedPlaceholders: true
  });

  return connection;
}
