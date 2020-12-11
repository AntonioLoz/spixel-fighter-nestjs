import { Module } from "@nestjs/common";
import { AnimationController } from "src/controllers/animation.controller";
import { AnimationService } from "src/services/animation.service";
import { MongodbModule } from "./mongo.module";

@Module({
    imports: [MongodbModule],
    controllers: [AnimationController],
    providers: [AnimationService]
})

export class AnimationModule {}