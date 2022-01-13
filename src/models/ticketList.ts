import { Ticket } from './ticket';

export  class TicketList {
    private lastNumber: number;
    private pending: Ticket[];
    private assigned: Ticket[];

    constructor() {
        this.lastNumber = 0;
        this.pending = [];
        this.assigned = [];
    }

    public get getNextNumber(): number {
        return ++this.lastNumber;
    }

    public get getLats13(): Ticket[] {
        return this.assigned.slice(0, 13);
    }

    public newTicket(): Ticket {
        const newTkt: Ticket = new Ticket(this.getNextNumber);
        this.pending.push(newTkt);
        return newTkt;
    }

    public assignedTicket(agent: string, desck: number): Ticket | null {
        if (this.pending.length === 0) return null;
        const nextTicket = this.pending.shift();//retorna desde el segundo elemento
        if (nextTicket === undefined) return null;
        nextTicket.setAgent = agent;
        nextTicket.setdesck = desck;

        this.assigned.unshift(nextTicket);//inserto ticket asignado al inicio del elemento

        return nextTicket;
    }

}