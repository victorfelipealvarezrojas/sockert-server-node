
export class socketClass {
    io: any;
    constructor(io: any) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        //On connectio 
        this.io.on('connection', (socket: any) => {
            socket.on('msg-to-server', (data: any) => {
                console.log(data);
                this.io.emit('msg-from-server', data);
            });
        });
    }
}