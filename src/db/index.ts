import { Pool, PoolConfig } from 'pg'

export const localPoolConfig: PoolConfig = {
  user: 'ufleming',
  password: 'flem715955789',
  host: 'localhost',
  port: 5432,
  database: '',
}

const poolConfig: PoolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
} : localPoolConfig

const pool = new Pool(poolConfig)

export default pool
