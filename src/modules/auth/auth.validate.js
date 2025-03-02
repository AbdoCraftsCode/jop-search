import { json } from "express";
import Joi from 'joi';
import { generalfields } from "../../middlewere/validation.middlewere.js";


export const signup = Joi.object().keys({
    // classId:generalfields.classId.required(),
    username: generalfields.username.required(),

    email: generalfields.email.required(),
    password: generalfields.password.required(),
    confirmationpassword: generalfields.confirmationpassword.required()


}



).required()




export const login = Joi.object().keys({



    email: generalfields.email.required(),
    password: generalfields.password.required(),



}



).required()




export const confirmemail = Joi.object().keys({

    code: Joi.string().required(),

    email: generalfields.email.required(),



}).required()


export const newotp = Joi.object().keys({



    email: generalfields.email.required(),



}).required()          