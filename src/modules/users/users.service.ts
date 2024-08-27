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

    async hashPassword (password){
        return bcrypt.hash(password , 10)
    }

    async findUserByEmail (email : string){
        return this.userRepository.findOne({where : {email}})
    }

    async createUser(dto : CreateUserDTO) : Promise<CreateUserDTO>{
   
        // const newUser = {
        //     firstName : dto.firstName ,
        //     username : dto.username ,
        //     email : dto.email ,
        //     password : dto.password
        // }
        const hash = await this.hashPassword(dto.password)
        await this.userRepository.create({
            firstName : dto.firstName ,
            username : dto.username ,
            email : dto.email ,
            password : hash
        })
        return dto 
    }

    async publicUser(email : string) {
        return this.userRepository.findOne({
            where : {email} ,
            attributes : {exclude :['password']} ,
            include : {
                model : Watchlist , 
                required : false ,
                
            }
        })
    }

    async updateUser(email : string , dto : updateUserDTO) : Promise<updateUserDTO>{
        await this.userRepository.update(dto , {where : {email}})
        return dto
    }

    async deleteUser(email : string) : Promise <boolean>{
        await this.userRepository.destroy({where : {email}})
        return true 
    }
}
