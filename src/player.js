export class Player{
    constructor(){
        this.lanes=[150,210,270,330];
        this.lane=1;
        this.x=this.lanes[this.lane];
        this.targetX=this.x;
        this.y=520;
        this.cooldown=0;
    }

    update(input){
        if(this.cooldown>0) this.cooldown--;

        if(input.left && this.cooldown===0){
            this.lane=Math.max(0,this.lane-1);
            this.cooldown=8;
        }

        if(input.right && this.cooldown===0){
            this.lane=Math.min(3,this.lane+1);
            this.cooldown=8;
        }

        this.targetX=this.lanes[this.lane];
        this.x+= (this.targetX-this.x)*0.25;
    }
}
