export class Track{
    constructor(){
        this.offset=0;
        this.speed=4;

        this.lanes=[150,210,270,330];
        this.enemies=[];
        this.spawnTimer=0;
    }

    update(){

        this.offset+=this.speed;
        if(this.offset>60) this.offset=0;

        this.speed+=0.002;

        // spawn
        this.spawnTimer--;
        if(this.spawnTimer<=0){
            this.spawnEnemies();
            this.spawnTimer=70-Math.min(50,this.speed*2);
        }

        // mover inimigos
        for(const e of this.enemies){
            e.y+=this.speed;
        }

        // remover fora da tela
        this.enemies=this.enemies.filter(e=>e.y<700);
    }

    spawnEnemies(){

        // escolhe faixa livre
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
}
