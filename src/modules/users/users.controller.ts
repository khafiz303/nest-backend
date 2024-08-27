import { Controller , Delete, Patch , Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO, updateUserDTO } from './dto';

import { JwtAuthGraud } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly  userService : UserService ){}

    @ApiTags('API')
    @ApiResponse({status : 200 , type : updateUserDTO})
    @UseGuards(JwtAuthGraud)
    @Patch()
    updateUser(@Body()  updateDto : updateUserDTO , @Req() request) : Promise <updateUserDTO>{
        const user = request.user
        return this.userService.updateUser(user.email , updateDto)
    }

    @UseGuards(JwtAuthGraud)
    @Delete()
    deleteUser( @Req() request) : Promise <boolean>{
        const user = request.user
        return this.userService.deleteUser(user.email)
    }
}
