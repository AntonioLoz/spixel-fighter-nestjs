import { Module } from "@nestjs/common";
import { Gateway } from "src/socket/gateway/fight.gateway";

@Module({
    providers: [ Gateway ]
})

export class SocketModule {}