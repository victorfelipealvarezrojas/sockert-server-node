import { TicketList } from "./ticketList";

type Props = { id: string; nombre: string };

export class socketClass {
    private io: any;
    private ticketList: TicketList;


    constructor(io: any) {
        this.io = io;
        //crear la isntancia de nuestro ticketList
        this.ticketList = new TicketList();
        this.socketEvents();

    }

    public get getTicketList() {
        return this.ticketList;
    }

    socketEvents() {
        this.io.on('connection', (socket: any) => {

            socket.on('solicitar-ticket', (__: undefined, callback: any) => {
                const nuewTicket = this.ticketList.newTicket();
                callback(nuewTicket);
            });

            socket.on('next-ticket', ({ agent, desck }: any, callback: any) => {
                const youTicket = this.ticketList.assignedTicket(agent, desck);
                callback(youTicket)

                this.io.emit('ticket-asignado', this.ticketList.getLats13);
            });



        });
    }
}