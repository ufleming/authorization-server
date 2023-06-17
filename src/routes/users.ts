import { Router, Request, Response } from 'express'
import pool from '../db'

const router = Router()

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    res.json({ users: users.rows })
  } catch (error) {
    res.status(500).json({ error })
  }
}

router.get('/', getUsers)

export default router
