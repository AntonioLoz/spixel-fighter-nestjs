import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

// Necesidad de incorporar dos atributos, uno para cada jugador. 
// Con ellos llevar el control de las vidas y el tiempo para así
// poder mandar un mensaje de finalizacion de la partida cuando
// uno de ellos haya llegado a cero o haya acabado el contador
// con la consiguiente desconexion de ambos clientes.

// Una vez la partida esté finalizada, se seteará la experiencia y el
// lvl de ambos fighters desde aqui, mediante la inyeccion de
// FighterService.

@WebSocketGateway(80)
export class FightGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    clientsCount: number;
    clients: Array<string>;
    flags: Array<boolean>;

    start: NodeJS.Timeout;
    timeOut: NodeJS.Timeout;
    stopFunction: Function;
    startFunction: Function;

    room: string;

    public constructor() {
        
        this.clientsCount = 0;
        this.clients = new Array<string>();
        this.flags = new Array<boolean>(2);
        this.setTimmerWaitingRoom();
        this.room = "waitingRoom"
    }

    public handleConnection(client: Socket, ...args: any[]) {

        
        client.join(this.room)

        if(this.clientsCount < 2) {
            this.clientsCount++;
            this.clients.push(client.id);

            console.log("TEST[FightGateway]: User conected ->", client.id);

            if(this.clientsCount === 2) {
            
                this.startFunction();
                this.timeOut = setTimeout(() => clearInterval(this.start) , 22000);
            }

            client.broadcast.emit('clientsCount', this.clientsCount);
        }
        else {
            client.disconnect(true);
            console.log("TEST[FightGateway](connectionHandle): Capacity exceeded");
        }
        
    }

    public handleDisconnect(client: Socket) {
        this.clientsCount--;
        client.broadcast.emit('clientsCount', this.clientsCount);
        this.clients.splice(this.clients.indexOf(client.id), 1);
        console.log("TEST[FightGateway]: User disconected ->", client.id);
        

        this.stopFunction();
        clearTimeout(this.timeOut);
        this.setTimmerWaitingRoom();
    }

    @SubscribeMessage('waitingRoom')
    public onWaitingRoom(@ConnectedSocket() client: Socket, @MessageBody() fighter: any){
        

            client.broadcast.emit('waitingRoom', fighter);
    }


    // Como data recibira un DTO con los atributos necesarios, como pueden ser:
    // turno del jugador, vida actual de ambos, daño provocado, tiempos de control.

    // @SubscribeMessage('ring')
    // public onRing(@ConnectedSocket() client: Socket, @MessageBody() turn: TurnDTO) {

    //     console.log(turn);
    //     client.broadcast.emit('ring', turn);
    // }



    private setTimmerWaitingRoom() {
        let x = 19;

        
        this.startFunction = function(){
            this.start = setInterval(() => {
                
                // console.log(x);
                this.server.to(this.room).emit('waitingRoomTimmer', x);
                x--;
            }, 1000);
        };

        this.stopFunction = function() {
            
            clearInterval(this.start);
            
        }
    }
}