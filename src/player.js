export class Player{
    constructor(){
        this.lanes=[150,210,270,330];
        this.currentLane=1;

        this.x=this.lanes[this.currentLane];
        this.targetX=this.x;

        this.y=520;
        this.switchCooldown=0;
    }

    update(input){

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
        this.x += (this.targetX - this.x) * 0.25;
    }
}
