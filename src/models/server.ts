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
    private socket:socketClass;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = socketio(this.server, {
            cors:{
                origin:'http://localhost:3000',
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
         });

        //inicializar socket
        this.socket = new socketClass(this.io);
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.get('/latest', (req, res) => {
            res.json({
                ok: true,
                latest: this.socket.getTicketList.getLats13
            });
        });
    }

    execute() {
        this.middlewares();
        this.server.listen(this.port, () => {
            console.log('corriendo en el puero: ', this.port);
        });
    }

}