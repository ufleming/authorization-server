import { Pool, PoolConfig } from 'pg'

export const localPoolConfig: PoolConfig = {
  user: 'postgres',
  password: 'sandbox',
  host: 'localhost',
  port: 5432,
  database: 'repeatedstudy',
}

const poolConfig: PoolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
} : localPoolConfig

const pool = new Pool(poolConfig)

export default pool
