import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import {encryptPassword, comparePassword} from "../helpers/bcrypt"
import {signJwt} from "../helpers/jwt"
export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async one(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, username, password } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      username,
      password : encryptPassword(password),
    });

    await this.userRepository.save(user);
    return "User has been created"
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const {email, password} = request.body

    const user = await this.userRepository.findOne({
      where : {email}
    })

    if(!user || !comparePassword(password, user.password)) return "Incorrect Email or Password"

    return {accessToken : signJwt({id : user.id})}
  }
}
