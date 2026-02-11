export class Enemies{
    constructor(){
        this.list=[];
        this.spawnTimer=0;
        this.speed=3;
        this.lastLane = 240;

    }

    update(trackSpeed){
        this.spawnTimer++;

        // aumenta velocidade junto com a pista
        this.speed = trackSpeed;

        // cria inimigos
        if(this.spawnTimer > 80 - Math.min(trackSpeed*5,50)){
   this.spawnTimer=0;

            const lanes=[160,240,320];
            let lane;
do{
    lane=lanes[Math.floor(Math.random()*lanes.length)];
}while(Math.abs(lane - this.lastLane) < 60);

this.lastLane = lane;


            this.list.push({
                x:lane,
                y:-40,
                w:16,
                h:32
            });
        }

        // move inimigos
        for(let e of this.list){
            e.y+=this.speed;
        }

        // remove fora da tela
        this.list=this.list.filter(e=>e.y<700);
    }
}
