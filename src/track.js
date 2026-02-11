export class Track{
    constructor(){
        this.offset = 0;
        this.speed = 3;
    }

    update(){
        this.offset += this.speed;
    }
}

