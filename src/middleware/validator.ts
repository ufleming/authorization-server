import { Request, Response, NextFunction } from 'express'
import { AuthRoute } from '../routes/auth'

const validateEmail = (userEmail: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
}

export const validateReqData = (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body

  if (req.path === AuthRoute.Register) {
    if (![email, name, password].every(Boolean)) {
      return res.json('Missing Credentials')
    } else if (!validateEmail(email)) {
      return res.json('Invalid Email')
    }
  } else if (req.path === AuthRoute.Login) {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials')
    } else if (!validateEmail(email)) {
      return res.json('Invalid Email')
    }
  }

  next()
}
