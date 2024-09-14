import Joi from 'joi';

export const  credential = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })

export const signup = Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    profilePicUrl: Joi.string().optional().uri(),
  })

export default {
    credential,
    signup
}

