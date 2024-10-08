import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGraud } from 'src/guards/jwt-guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @ApiTags('API')
    @ApiResponse({status : 201 , type :CreateUserDTO  })
    @Post('register')
    register(@Body() dto : CreateUserDTO) : Promise<CreateUserDTO>{
        return this.authService.registerUsers(dto)
    }

    @ApiResponse({status : 200 , type :AuthUserResponse  })
    @ApiTags('API')
    @Post('login')
    login(@Body() dto : UserLoginDTO) : Promise<AuthUserResponse>{
        return this.authService.loginUser(dto)
    }

    @UseGuards(JwtAuthGraud)
    @Post ('test')
    test(){
        return true
    }

}
