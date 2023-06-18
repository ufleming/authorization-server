import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import pool from '../db'
import jwtGenerator from '../utils/jwtGenerator'

const GET_USER_QUERY = 'SELECT * FROM users WHERE user_email = $1'
const SAVE_USER_QUERY = 'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *'

export const registerUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body

  try {
    const user = await pool.query(GET_USER_QUERY, [email])

    if (user.rows.length > 0) return res.status(401).json('User Exists')

    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)
    const newUser = await pool.query(SAVE_USER_QUERY, [name, email, bcryptPassword])
    const jwtToken = jwtGenerator(newUser.rows[0].user_id)

    return res.json({ jwtToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await pool.query(GET_USER_QUERY, [email])

    if (user.rows.length === 0) return res.status(401).json('Invalid Credential')

    const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

    if (!validPassword) return res.status(401).json('Invalid Credential')

    const jwtToken = jwtGenerator(user.rows[0].user_id)

    return res.json({ jwtToken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

export const verifyUser = async (req: Request, res: Response) => {
  try {
    res.json(true)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
