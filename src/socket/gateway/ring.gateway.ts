import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { TurnResultDTO } from "src/models/DTOs/turnResult.dto";

@WebSocketGateway(85)
export class RingGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private server: Server;
    

    private generalStart: NodeJS.Timeout;
    private generalTimeOut: NodeJS.Timeout;
    private generalStopFunction: Function;
    private generalStartFunction: Function;
    private generalCount: number;

    private turnStart: NodeJS.Timeout;
    private turnTimeOut: NodeJS.Timeout;
    private turnStopFunction: Function;
    private turnStartFunction: Function;
    private turnCount: number;
    private flags: Array<boolean>;

    private : Array<Socket>;
    private socketsId: Array<string>;
    private clientsCount: number;

    private room: string;

    public constructor() {
        this.clientsCount = 0;
        this.socketsId = new Array<string>();
        this.flags = new Array<boolean>(false, false);
        this.room = "ring";
        this.setTurnTimmer();
        this.setGeneralTimmer();
        this.generalCount = 60;
        this.turnCount = 9
    }


    public handleConnection(client: Socket, ...args: any[]) {
        
        if(this.clientsCount === 2){
            this.server.to(client.id).emit("disconnect", 'User disconnected. Capacity exceeded');
            client.disconnect(true);
        }

        if(this.clientsCount < 2) {
            this.clientsCount ++;
            this.socketsId.push(client.id);
            this.setGeneralTimmer();
            client.join(this.room)
            this.server.to(client.id).emit('private', 'You are connected');
            console.log("TEST[RingGateway]: User connected  ->", client.id);
        }

        if(this.clientsCount === 2) {
            this.flags = this.getFlagsRandom();
            this.server.to(this.socketsId[0]).emit('flag', this.flags[0]);
            this.server.to(this.socketsId[1]).emit('flag', this.flags[1]);
            
            this.setTurnTimmer();
            this.generalStartFunction(this.generalCount);
            this.turnStartFunction(this.turnCount);
            this.generalTimeOut = setTimeout(() => clearInterval(this.generalStart) , (this.generalCount + 2) * 1000);
        }

        
        
    }

    public handleDisconnect(client: Socket) {
        
        this.socketsId.splice(this.socketsId.indexOf(client.id), 1);

        this.clientsCount--;
    
        console.log("TEST[RingGateway]: User disconected ->", client.id);
        
        this.disconnectAll();
        
    }


    private setGeneralTimmer() {
        

        this.generalStartFunction = function(counter: number){

            
            this.generalStart = setInterval(() => {
                
                this.server.to(this.room).emit('generalTimmer', counter);
                console.log("General counter:",counter);
                
                counter--;
            }, 1000);
        };

        this.generalStopFunction = function() {
            
            clearInterval(this.generalStart);
            clearInterval(this.turnStart);
         
        };
    }

    private setTurnTimmer() {
        

        this.turnStartFunction = function(counter: number) {
            
            this.turnStart = setInterval( () => {
                this.server.to(this.room).emit('turnTimmer', counter);
                // console.log('turnTimmer:', counter);

                if(counter <= 0) {
                    this.turnStopFunction();
                    this.switchFlags();

                    setTimeout( () => {
                        this.server.to(this.socketsId[0]).emit('flag', this.flags[0]);
                        this.server.to(this.socketsId[1]).emit('flag', this.flags[1]);
                        console.log("flags:", this.flags);
                        
                        this.turnStartFunction(this.turnCount);
                    }, 3000);
                    
                }
                else {
                    counter--;
                }
                                
            }, 1000);
        };

        this.turnStopFunction = function () {
            clearInterval(this.turnStart);
        };
    }

    private disconnectAll() {
        this.server.emit('disconnect', 'User disconected');
        this.generalStopFunction();
        clearTimeout(this.generalTimeOut);
        this.turnStopFunction();
        clearTimeout(this.turnTimeOut);
    }

    private switchFlags() {
        this.flags[0] = !this.flags[0];
        this.flags[1] = !this.flags[1];
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

    // Invertira las flags de turno,
    // emitirá el resultado del turno al recibidor del ataque
    // reiniciará el timmer
    @SubscribeMessage('turn')
    public controlTurnEvent(@MessageBody() turnResult: TurnResultDTO, @ConnectedSocket() client: Socket) {
        
        this.turnStopFunction();

        if(this.socketsId[0] !== client.id) {
            this.server.to(this.socketsId[0]).emit('turnResult', turnResult);
        }
        else {
            this.server.to(this.socketsId[1]).emit('turnResult', turnResult);
        }
    }

    @SubscribeMessage('animationDone')
    public animationDoneEvent() {
        
        this.switchFlags();
        this.server.to(this.socketsId[0]).emit('flag', this.flags[0]);
        this.server.to(this.socketsId[1]).emit('flag', this.flags[1]);
        this.turnStartFunction(this.turnCount);
    }

    @SubscribeMessage('life')
    public lifeControlEvent(@MessageBody() life: number, @ConnectedSocket() client: Socket){
        if(client.id !== this.socketsId[0]){
            this.server.to(this.socketsId[0]).emit('life', life);
        }
        else {
            this.server.to(this.socketsId[0]).emit('life', life)
        }
    }
}
