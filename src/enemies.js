export class Enemies{
    constructor(){
        this.list=[];
        this.timer=0;
        this.patternDelay=90;
    }

    update(speed){
        this.timer++;

        if(this.timer>this.patternDelay){
            this.timer=0;

            const lanes=[150,210,270,330];

            // escolhe a faixa segura
            const safeLane=Math.floor(Math.random()*4);

            for(let i=0;i<4;i++){
                if(i===safeLane) continue;

                this.list.push({
                    lane:i,
                    x:lanes[i],
                    y:-60,
                    w:18,
                    h:40
                });
            }
        }

        for(let e of this.list){
            e.y+=speed;
        }

        this.list=this.list.filter(e=>e.y<700);
    }
}
