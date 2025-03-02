import { Router } from "express";
import { validation } from "../../middlewere/validation.middlewere.js";
import  * as validators from "../auth/auth.validate.js"
import { confirmOTP, signup, signupwithGmail } from "./service/regestration.service.js";
import { forgetpassword,   login, loginwithGmail, refreshToken, resetpassword } from "./service/authontecation.service.js";
import { authentication } from "../../middlewere/authontcation.middlewere.js";

const routr = Router()




routr.post("/signup", signup)

routr.post("/signupwithGmail", signupwithGmail)
routr.post("/confirmOTP", confirmOTP)
routr.post("/login",  login)
routr.post("/refreshToken",refreshToken)
routr.post("/forgetpassword", forgetpassword)
routr.post("/resetpassword", resetpassword)
routr.post("/loginwithGmail", loginwithGmail)
export default routr