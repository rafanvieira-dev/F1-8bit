export class Enemies{
    constructor(){
        this.list=[];
        this.spawnTimer=0;
        this.speed=3;
    }

    update(trackSpeed){
        this.spawnTimer++;

        // aumenta velocidade junto com a pista
        this.speed = trackSpeed;

        // cria inimigos
        if(this.spawnTimer>60){
            this.spawnTimer=0;

            const lanes=[160,240,320];
            const lane=lanes[Math.floor(Math.random()*lanes.length)];

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
