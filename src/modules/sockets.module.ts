import { Module } from "@nestjs/common";
import { FightGateway } from "src/socket/gateway/fight.gateway";
import { RingGateway } from "src/socket/gateway/ring.gateway";

@Module({
    providers: [ FightGateway, RingGateway ]
})

export class SocketModule {}