export class Player{
    constructor(){
        this.lanes=[150,210,270,330];
        this.currentLane=1;

        this.x=this.lanes[this.currentLane]; // <- POSIÇÃO INICIAL (FALTAVA ISSO)
        this.targetX=this.x;

        this.y=520;
        this.switchCooldown=0;
    }

    update(input){

        // pequeno tempo entre trocas (fica mais natural)
        if(this.switchCooldown>0) this.switchCooldown--;

        if(input.left && this.switchCooldown===0){
            this.currentLane=Math.max(0,this.currentLane-1);
            this.switchCooldown=8;
        }

        if(input.right && this.switchCooldown===0){
            this.currentLane=Math.min(3,this.currentLane+1);
            this.switchCooldown=8;
        }

        this.targetX=this.lanes[this.currentLane];

        // movimento suave (lerp correto)
        this.x += (this.targetX - this.x) * 0.25;
    }
}
