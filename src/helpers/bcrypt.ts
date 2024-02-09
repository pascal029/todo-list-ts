import * as bcrypt from 'bcryptjs'

export const encryptPassword = (password : string) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const comparePassword = (password , encryptedPassword ) => bcrypt.compareSync(password, encryptedPassword)