import express from 'express';
import {
  login,
  logout,
  singup,
  verifyEmail,
  forgotPassword,
} from '../controller/auth.controller.js';

const routes = express.Router();

routes.post('/singup', singup)

routes.post('/login', login)

routes.post('/logout', logout)

routes.post("/verify-email", verifyEmail)

routes.post('/forgot-password', forgotPassword);

export default routes;