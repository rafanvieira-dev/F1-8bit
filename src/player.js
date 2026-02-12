export class Player{
constructor(track){

```
    this.track=track;

    this.lane=1;
    this.x=track.lanes[this.lane];
    this.targetX=this.x;

    this.y=track.canvas.height*0.82;
    this.cooldown=0;
    this.crashed=false;
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

    this.targetX=this.track.lanes[this.lane];
    this.x+= (this.targetX-this.x)*0.25;
}
```

}
