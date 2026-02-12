export class Player{

    constructor(track){

        this.track = track;

        this.lane = 1;
        this.x = 0;
        this.targetX = 0;
        this.y = track.canvas.height - 120;

        this.cooldown = 0;
        this.crashed = false;

        this.updateLanePosition();
    }

    updateLanePosition(){
        const laneWidth = this.track.roadWidth / this.track.lanesCount;
        this.targetX = this.track.roadLeft + laneWidth*this.lane + laneWidth/2;
        if(this.x===0) this.x=this.targetX;
    }

    update(input){

        if(this.cooldown>0) this.cooldown--;

        if(input.left && this.cooldown===0){
            this.lane=Math.max(0,this.lane-1);
            this.cooldown=8;
            this.updateLanePosition();
        }

        if(input.right && this.cooldown===0){
            this.lane=Math.min(this.track.lanesCount-1,this.lane+1);
            this.cooldown=8;
            this.updateLanePosition();
        }

        this.x += (this.targetX-this.x)*0.25;
    }
}
