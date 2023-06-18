import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtGenerator = (userId: string) => {
  const payload = {
    user: {
      id: userId
    }
  }

  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' })
}

export default jwtGenerator
