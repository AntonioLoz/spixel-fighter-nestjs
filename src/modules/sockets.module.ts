import { Module } from "@nestjs/common";
import { Gateway } from "src/socket/gateway/fight.gateway";
import { RingGateway } from "src/socket/gateway/ring.gateway";

@Module({
    providers: [ Gateway, RingGateway ]
})

export class SocketModule {}