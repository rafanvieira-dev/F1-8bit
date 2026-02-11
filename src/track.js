export class Track{
    constructor(){
        this.offset=0;
        this.speed=3;
    }

    update(score){
        this.speed = 3 + score/600; // acelera com o tempo
        this.offset+=this.speed;
    }
}
