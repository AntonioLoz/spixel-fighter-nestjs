import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { Server } from "http";

@WebSocketGateway(80)
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    clientsCount: number;
    clients: Array<string>;

    constructor() {
        this.clientsCount = 0;
        this.clients = new Array<string>();
    }

    handleConnection(client: Socket, ...args: any[]) {

        if(this.clientsCount < 2) {
            this.clientsCount++;
            this.clients.push(client.id);
            console.log("TEST[Gateway](connectionHandle):");
            console.log("-> ClientsCount:", this.clientsCount);
            console.log("-> Clients: ", this.clients);          
        }
        else {
            client.disconnect(true);
            console.log("TEST[Gateway](connectionHandle): full capacity");
        }
    }

    handleDisconnect(client: Socket) {
        this.clientsCount--;
        this.clients.splice(this.clients.indexOf(client.id), 1);
        console.log("TEST[Gateway](disconnectionHandle):");
        console.log("-> ClientsCount:", this.clientsCount);
        console.log("-> Clients: ", this.clients);  
    }
    
}