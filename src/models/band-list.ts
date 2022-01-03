import { Band } from "./band";

export class BandList {

    private bands: Band[];

    //cargop algunos datos por medio del constructor de la clase Band
    constructor() {
        this.bands = [
            new Band('musica de piano'),
            new Band('musica acuatica'),
            new Band('no musica'),
            new Band('si musica')
        ]
    }

    addBand(name: string) {
        return this.bands.push(new Band(name));
    }

    removeBand(id: string) {
        return (this.bands = this.bands.filter((band: Band) => band.getId() !== id));
    }

    getBand() {
        return this.bands;
    }

    increaseVotes(id: string) {
        this.bands.map((band: Band) => {
            if (band.getId() === id) band.setIncrementVote();
            return band
        });
    }

    changeName(id: string, newName: string) {
        this.bands.map((band: Band) => {
            if (band.getId() === id) band.setRename(newName);
            return band
        });
    }

}