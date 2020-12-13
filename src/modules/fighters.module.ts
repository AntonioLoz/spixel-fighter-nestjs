import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FighterController } from "src/controllers/fighter.controller";
import { Fighter } from "src/models/entities/fighter.entity";
import { FighterService } from "src/services/fighter.service";
import { AnimationModule } from "./animations.module";

@Module({

    imports: [ TypeOrmModule.forFeature([Fighter]), AnimationModule],
    providers: [FighterService],
    controllers: [FighterController],
    exports: [FighterService]
})

export class FighterModule {}