export class Player{
    constructor(){
        this.lanes=[150,210,270,330];
        this.currentLane=1;
        this.targetX=this.lanes[this.currentLane];
        this.y=520;
    }

    update(input){
        if(input.left){
            this.currentLane=Math.max(0,this.currentLane-1);
            input.left=false;
        }

        if(input.right){
            this.currentLane=Math.min(3,this.currentLane+1);
            input.right=false;
        }

        this.targetX=this.lanes[this.currentLane];

        // movimento suave
        this.x += (this.targetX-this.x)*0.2 || (this.x=this.targetX);
    }
}
