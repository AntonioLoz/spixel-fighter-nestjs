import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthControler } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth.service";
import { UserModule } from "./user.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.TOKEN_EXPIRE}
        })
    ],
    controllers: [AuthControler],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule{}