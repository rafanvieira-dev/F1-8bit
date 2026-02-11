export class Player{
    constructor(){
        this.x = 240;
        this.y = 520;
        this.speed = 4;
    }

    update(input){
        if(input.left) this.x -= this.speed;
        if(input.right) this.x += this.speed;

        // limite da pista
        if(this.x < 140) this.x = 140;
        if(this.x > 340) this.x = 340;
    }
}

