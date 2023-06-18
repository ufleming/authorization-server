import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('jwt_token')

  if (!token) return res.status(403).json({ msg: "authorization denied" })

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET as string)

    // @ts-ignore
    req.user = verify.user
    next()
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" })
  }
}
