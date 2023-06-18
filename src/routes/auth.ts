import { Router } from 'express'
import { validateReqData } from '../middleware/validator'
import { authorize } from '../middleware/authorize'
import * as authControllers from '../controllers/auth'

export enum AuthRoute {
  Register = '/register',
  Login = '/login',
  Verify = '/verify',
}

const router = Router()

router.post(AuthRoute.Register, validateReqData, authControllers.registerUser)
router.post(AuthRoute.Login, validateReqData, authControllers.loginUser)
router.get(AuthRoute.Verify, authorize, authControllers.verifyUser)

export default router
