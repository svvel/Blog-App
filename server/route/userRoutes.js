import express from "express";
//Controller Func For Handiling Response
import { getUser, signup, login } from "../controller/userController.js";

const route = express.Router()

route.get('/',getUser)
route.post('/signup', signup)
route.post('/login',login)

export default route;