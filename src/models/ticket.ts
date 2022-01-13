import { v4 as uuid } from 'uuid';

export class Ticket {

    private id: string
    private number: number;
    private desck: number | null;
    private agent: string | null;

    public constructor(number: number) {
        this.id = uuid();
        this.number = number;
        this.desck = null;
        this.agent = null;
    }

    public set setAgent(agent: string) {
        this.agent = agent;
    }

    public set setdesck(desck: number) {
        this.desck = desck;
    }



}

