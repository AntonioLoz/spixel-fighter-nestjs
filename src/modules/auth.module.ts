import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthControler } from "src/controllers/auth.controller";
import { JwtStrategy } from "src/jwt.strategy";
import { AuthService } from "src/services/auth.service";
import { UserModule } from "./user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.TOKEN_EXPIRE}
        })
    ],
    
    controllers: [AuthControler],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule{}