export class Track{
    constructor(){
        this.offset=0;
        this.speed=4;
    }

    update(){
        this.offset+=this.speed;
        if(this.offset>60) this.offset=0;
        this.speed+=0.0005; // aceleração gradual
    }
}
