import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO, updateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';
import { Watchlist } from '../watchlist/models/watchlist.model';
@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository : typeof  User){}

    async hashPassword (password : string) : Promise<string>{
        try {
            return bcrypt.hash(password , 10)
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUserByEmail (email : string) : Promise<User>{
        try {
            return this.userRepository.findOne({where : {email} , include : {
                model : Watchlist , 
                required : false
            }})
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async createUser(dto : CreateUserDTO) : Promise<CreateUserDTO>{
   
        // const newUser = {
        //     firstName : dto.firstName ,
        //     username : dto.username ,
        //     email : dto.email ,
        //     password : dto.password
        // }
        try {
            const hash = await this.hashPassword(dto.password)
            await this.userRepository.create({
                firstName : dto.firstName ,
                username : dto.username ,
                email : dto.email ,
                password : hash
            })
            return dto 
        } catch (error) {
            throw new Error(error)
        }
       
    }

    async publicUser(email : string) : Promise<User> {
        try {
            return this.userRepository.findOne({
                where : {email} ,
                attributes : {exclude :['password']} ,
                include : {
                    model : Watchlist , 
                    required : false ,
                    
                }
            })
        } catch (error) {
            throw new Error(error)
        }
       
    }

    async updateUser(email : string , dto : updateUserDTO) : Promise<updateUserDTO>{
        try {
            await this.userRepository.update(dto , {where : {email}})
            return dto
        } catch (error) {
            throw new Error(error)
        }
      
    }

    async deleteUser(email : string) : Promise <boolean>{
        try {
            await this.userRepository.destroy({where : {email}})
            return true 
        } catch (error) {
            throw new Error(error)
        }
   
    }
}
