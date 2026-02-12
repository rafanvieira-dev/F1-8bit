export class Track{
constructor(canvas){

```
    this.canvas = canvas;
    this.offset=0;
    this.speed=4;

    /* largura da pista proporcional */
    this.roadWidth = canvas.width*0.55;
    this.left = (canvas.width-this.roadWidth)/2;
    this.laneWidth = this.roadWidth/4;

    /* gera 4 faixas dinamicas */
    this.lanes=[];
    for(let i=0;i<4;i++){
        this.lanes.push(this.left+this.laneWidth*(i+0.5));
    }

    this.enemies=[];
    this.spawnTimer=0;
    this.kmh=60;
}

update(player){

    this.offset+=this.speed;
    if(this.offset>60) this.offset=0;

    /* aceleração progressiva */
    this.speed+=0.002;
    this.kmh=Math.floor(this.speed*18);

    /* spawn inimigos */
    this.spawnTimer--;
    if(this.spawnTimer<=0){
        this.spawnEnemies();
        this.spawnTimer=70-Math.min(50,this.speed*2);
    }

    /* mover inimigos */
    for(const e of this.enemies){
        e.y+=this.speed;

        /* colisão */
        if(Math.abs(e.y-player.y)<55 &&
           Math.abs(e.x-player.x)<this.laneWidth*0.4){
            player.crashed=true;
        }
    }

    /* remover fora da tela */
    this.enemies=this.enemies.filter(e=>e.y<this.canvas.height+100);
}

spawnEnemies(){

    const freeLane=Math.floor(Math.random()*4);

    for(let i=0;i<4;i++){
        if(i===freeLane) continue;

        this.enemies.push({
            lane:i,
            x:this.lanes[i],
            y:-80
        });
    }
}
```

}
