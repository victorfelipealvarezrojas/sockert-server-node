import express, { Express } from 'express';
import { Server, createServer } from 'http';
import path from 'path';
import { socketClass } from './socket';
const socketio = require('socket.io');


export class serverClass {
    app: Express;
    port: string | undefined;
    server: Server;
    io: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //http server
        this.server = createServer(this.app);
        //conf socket
        this.io = socketio(this.server, {/*Configuraciones */ });
    }

    middlewares() {
        //desplegar directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }
    
    configurarSocket(){
        new socketClass(this.io);
    }

    execute() {
        //init middlewares
        this.middlewares();
        //ini socket
        this.configurarSocket();
        //ini server
        this.server.listen(this.port, () => {
            console.log('corriendo en el puero: ', this.port);
        });
    }


}