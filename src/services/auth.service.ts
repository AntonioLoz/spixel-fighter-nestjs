import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "src/models/DTOs/login.dto";
import { User } from "src/models/entities/user.entity";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { PayloadDTO } from "src/models/DTOs/payload.dto";


@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    public async validateUser(userDto: LoginDTO): Promise<boolean> {

        let user: User;

        if(String(userDto.userId).includes("@")){
           user = await this.userService.getByEmail(userDto.userId);
        }

        else {
            user = await this.userService.getByUsername(userDto.userId)
        }

        if(!user) {
            throw new NotFoundException(`User ${userDto.userId} not found`);
        }

        
        return await bcrypt.compare(userDto.password, user.password);
    }

    public async generateToken(name: string) {
        const user = await this.userService.getByUsername(name);
        const payload: PayloadDTO = {username: user.username, id: user.id, email: user.email};

        return this.jwtService.sign(payload);
    }

}