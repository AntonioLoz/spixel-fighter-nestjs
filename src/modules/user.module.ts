import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/models/entities/user.entity";
import { UserService } from "src/services/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule {}