export class Track{

    constructor(canvas){

        this.canvas = canvas;

        this.offset = 0;
        this.speed = 4;

        /* largura dinâmica da pista */
        this.roadWidth = canvas.width * 0.45;
        this.roadLeft = (canvas.width - this.roadWidth)/2;

        this.lanesCount = 4;
        this.laneWidth = this.roadWidth/this.lanesCount;

        this.enemies = [];
        this.spawnTimer = 0;
    }

    /* retorna quantos carros o player ultrapassou */
    update(player){

        let passed = 0;

        /* movimento da pista */
        this.offset += this.speed;
        if(this.offset>60) this.offset=0;

        /* aceleração progressiva */
        this.speed += 0.0025;

        /* spawn */
        this.spawnTimer--;
        if(this.spawnTimer<=0){
            this.spawnEnemies();
            this.spawnTimer = 70 - Math.min(55,this.speed*2);
        }

        /* mover inimigos */
        for(const e of this.enemies){

            e.y += this.speed;

            /* passou pelo player */
            if(!e.counted && e.y > player.y){
                e.counted = true;
                passed++;
            }

            /* colisão */
            if(
                player.x-10 < e.x+14 &&
                player.x+10 > e.x-14 &&
                player.y-20 < e.y+20 &&
                player.y+20 > e.y-20
            ){
                player.crashed = true;
            }
        }

        /* remover fora da tela */
        this.enemies = this.enemies.filter(e=>e.y < this.canvas.height+80);

        return passed;
    }

    spawnEnemies(){

        /* uma faixa sempre livre */
        const freeLane = Math.floor(Math.random()*this.lanesCount);

        for(let i=0;i<this.lanesCount;i++){

            if(i===freeLane) continue;

            const x = this.roadLeft + this.laneWidth*i + this.laneWidth/2;

            this.enemies.push({
                lane:i,
                x:x,
                y:-80,
                counted:false
            });
        }
    }

    /* kmh estilo arcade */
    get kmh(){
        return Math.floor(this.speed*18);
    }
}
