import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { LoginDTO } from "src/models/DTOs/login.dto";
import { ResponseDTO } from "src/models/DTOs/responselogin.dto";
import { AuthService } from "src/services/auth.service";

@Controller('login')
export class AuthControler {

    constructor(private service: AuthService) {
        
    }

    @Post()
    public async login(@Body() loginDto: LoginDTO): Promise<ResponseDTO>{
        console.log("TEST[AuthController]:", loginDto);
        

        const flag: boolean = await this.service.validateUser(loginDto);

        if(!flag) {
            throw new UnauthorizedException();
        }

        const responseDto: ResponseDTO = {
            token : await this.service.generateToken(loginDto.userId)
        }

        return responseDto;
    }
}