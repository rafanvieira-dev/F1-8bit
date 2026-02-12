export class Player{

    constructor(track){

        this.track=track;

        this.lane=1;
        this.x=0;
        this.targetX=0;

        this.y=520;
        this.cooldown=0;
        this.crashed=false;

        this.updateLanePosition();
    }

    updateLanePosition(){
        this.targetX=
            this.track.roadLeft+
            this.track.laneWidth*this.lane+
            this.track.laneWidth/2;
    }

    update(input){

        if(this.cooldown>0) this.cooldown--;

        if(input.left && this.cooldown===0){
            this.lane=Math.max(0,this.lane-1);
            this.cooldown=8;
            this.updateLanePosition();
        }

        if(input.right && this.cooldown===0){
            this.lane=Math.min(3,this.lane+1);
            this.cooldown=8;
            this.updateLanePosition();
        }

        this.x+=(this.targetX-this.x)*0.25;
    }
}
