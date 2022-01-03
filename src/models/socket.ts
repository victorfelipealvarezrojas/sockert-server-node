import { BandList } from "./band-list";

type Props = { id: string; nombre: string };

export class socketClass {
    private io: any;
    private bandList: BandList;

    constructor(io: any) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        //On connection, cuando malguien entre al canal del socket llegara aqui activando la comunicacion con el cliente (full duplex)
        this.io.on('connection', (socket: any) => {

            console.log("cliente conectado");

            //Emitir al cliente todas las bandas actuales apenas se conecta al canal de comunicacion
            socket.emit(
                'current-bands',
                this.bandList.getBand(),
            );

            //votacion
            socket.on('votar-banda', (id: string) => {
                this.bandList.increaseVotes(id);
                //socket.emit solo va al cliente que emite este evento
                //this.io lo emite a todos los clientes y todos actualizan su estado
                this.io.emit(
                    'current-bands',
                    this.bandList.getBand(),
                );
            });

            //eliminar banda
            socket.on('eliminar-banda', (id: string) => {
                this.bandList.removeBand(id);
                this.io.emit(
                    'current-bands',
                    this.bandList.getBand(),
                );
            });

            socket.on('cambiarNombre-band', ({ id, nombre }: Props) => {
                this.bandList.changeName(id, nombre);
                this.io.emit(
                    'current-bands',
                    this.bandList.getBand(),
                );
            });

            socket.on('nueva-banda', (nombre: string) => {
                this.bandList.addBand(nombre);
                this.io.emit(
                    'current-bands',
                    this.bandList.getBand(),
                );
            });

        });
    }
}