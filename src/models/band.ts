import { v4 as uuid } from 'uuid';

export class Band {

    private id: string;
    private name: string;
    private votes: number;

    constructor(name: string) {
        this.id = uuid()
        this.name = name;
        this.votes = 0;
    }

    getId() {
        return this.id;
    }

    setIncrementVote() {
        return this.votes += 1;
    }

    setRename(newName: string) {
        return this.name = newName;
    }
}