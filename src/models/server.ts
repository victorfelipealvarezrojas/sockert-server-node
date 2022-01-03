import express, { Express } from 'express';
import { Server, createServer } from 'http';
import path from 'path';
import { socketClass } from './socket';
import cors from 'cors';
const socketio = require('socket.io');

export class serverClass {
    private app: Express;
    private port: string | undefined;
    private server: Server;
    private io: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //http server
        this.server = createServer(this.app);
        //conf socket
        this.io = socketio(this.server, {/*Configuraciones */ });
    }

    middlewares() {
        //desplegar directorio publico donde tengo el HTML index.html desde el navegador
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        //cors
        this.app.use(cors());
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