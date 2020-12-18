import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import * as io from 'socket.io'
import { Server } from "http";
import { TurnDTO } from "src/models/DTOs/turn.dto";

// Necesidad de incorporar dos atributos, uno para cada jugador. 
// Con ellos llevar el control de las vidas y el tiempo para así
// poder mandar un mensaje de finalizacion de la partida cuando
// uno de ellos haya llegado a cero o haya acabado el contador
// con la consiguiente desconexion de ambos clientes.

// Una vez la partida esté finalizada, se seteará la experiencia y el
// lvl de ambos fighters desde aqui, mediante la inyeccion de
// FighterService.

@WebSocketGateway(80)
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    clientsCount: number;
    clients: Array<string>;
    flags: Array<boolean>;

    start: NodeJS.Timeout;
    stopFunction: Function;
    startFunction: Function;

    public constructor() {
        this.clientsCount = 0;
        this.clients = new Array<string>();
        this.flags = new Array<boolean>(2);
        this.setTimmerWaitingRoom();
    }

    public handleConnection(client: Socket, ...args: any[]) {

        if(this.clientsCount < 2) {
            this.clientsCount++;
            this.clients.push(client.id);


            if(this.clientsCount <= 1) {
                this.flags = this.getFlagsRandom();
            }
            else {
                this.startFunction(client);
                setTimeout(() => clearInterval(this.start) , 22000);
            }

            client.broadcast.emit('clientsCount', this.clientsCount);
            
            console.log("TEST[Gateway](connectionHandle):");
            console.log("-> ClientsCount:", this.clientsCount);
            console.log("-> Clients: ", this.clients); 
            
            
        }
        else {
            client.disconnect(true);
            console.log("TEST[Gateway](connectionHandle): full capacity");
        }
        
    }

    public handleDisconnect(client: Socket) {
        this.clientsCount--;
        this.clients.splice(this.clients.indexOf(client.id), 1);

        client.broadcast.emit('clientsCount', this.clientsCount);

        this.stopFunction();
        this.setTimmerWaitingRoom();
        

        console.log("TEST[Gateway](disconnectionHandle):");
        console.log("-> ClientsCount:", this.clientsCount);
        console.log("-> Clients: ", this.clients);
    }

    @SubscribeMessage('waitingRoom')
    public onWaitingRoom(@ConnectedSocket() client: Socket, @MessageBody() fighter: any){

        client.broadcast.emit('waitingRoom', fighter);
    }


    // Como data recibira un DTO con los atributos necesarios, como pueden ser:
    // turno del jugador, vida actual de ambos, daño provocado, tiempos de control.

    @SubscribeMessage('ring')
    public onRing(@ConnectedSocket() client: Socket, @MessageBody() turn: TurnDTO) {

        console.log(turn);
        client.broadcast.emit('ring', turn);
    }

    private switchFlags() {
        this.flags[0] = this.flags[0] ? false : true;
        this.flags[1] = this.flags[1] ? false : true;
    }

    private getFlagsRandom(): Array<boolean> {
        const x = Math.floor(Math.random() * 10);
        let flags = new Array<boolean>(2);

        if(x > 5) {
            flags[0] = true;
            flags[1] = false;
        }
        else {
            flags[1] = true;
            flags[0] = false;
        }
        return flags;
    }

    private setTimmerWaitingRoom() {
        let x = 19;

        this.startFunction = function(){
            this.start = setInterval(() => {
                
                console.log(x);
                this.server.emit('waitingRoomTimmer', x);
                x--;
            }, 1000);
        };

        this.stopFunction = function() {
            
            clearInterval(this.start);
        }
    }
}