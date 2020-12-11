import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadDTO } from "./models/DTOs/payload.dto";
import { User } from "./models/entities/user.entity";
import { UserService } from "./services/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });        
    }

    public async validate(payload: PayloadDTO): Promise<User> {

        const user = await this.userService.getById(payload.id);
        
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}