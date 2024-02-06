import {sign, verify} from "jsonwebtoken"
import {config} from "dotenv"
const secretKey = config().parsed.SECRET_KEY

export const signJwt = payload => sign(payload, secretKey)
export const verifyJwt = token => verify(token, secretKey)