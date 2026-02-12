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

    update(player){

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

        /* mover inimigos + colisão */
        for(const e of this.enemies){

            e.y += this.speed;

            /* colisão real (hitbox maior pro celular) */
            if(
                player.x-18 < e.x+18 &&
                player.x+18 > e.x-18 &&
                player.y-28 < e.y+28 &&
                player.y+28 > e.y-28
            ){
                player.crashed = true;
            }
        }

        /* remover fora da tela */
        this.enemies = this.enemies.filter(e=>e.y < this.canvas.height+80);
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
                y:-80
            });
        }
    }

    get kmh(){
        return Math.floor(this.speed*18);
    }
}
