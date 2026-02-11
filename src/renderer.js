export function drawTrack(ctx, track){
    ctx.fillStyle="#2b2b2b";
    ctx.fillRect(120,0,240,640);

    ctx.fillStyle="#ffffff";
    for(let i=0;i<20;i++){
        ctx.fillRect(238,(i*40-track.offset%40),4,20);
    }
}

export function drawCar(ctx,player){

    const x=player.x;
    const y=player.y;

    // sombra
    ctx.fillStyle="#00000055";
    ctx.fillRect(x-14,y+22,28,6);

    // asa traseira
    ctx.fillStyle="#111";
    ctx.fillRect(x-18,y-6,36,4);

    // corpo principal
    ctx.fillStyle="#e10600";
    ctx.fillRect(x-6,y-10,12,34);

    // cockpit
    ctx.fillStyle="#00d0ff";
    ctx.fillRect(x-4,y,8,10);

    // nariz
    ctx.fillStyle="#ff2a2a";
    ctx.fillRect(x-3,y-18,6,10);

    // asa dianteira
    ctx.fillStyle="#111";
    ctx.fillRect(x-16,y-20,32,4);

    // rodas traseiras
    ctx.fillStyle="#000";
    ctx.fillRect(x-14,y+10,6,10);
    ctx.fillRect(x+8,y+10,6,10);

    // rodas dianteiras
    ctx.fillRect(x-14,y-6,6,10);
    ctx.fillRect(x+8,y-6,6,10);
}


export function drawEnemies(ctx,enemies){
    ctx.fillStyle="yellow";

    for(let e of enemies.list){

        ctx.fillRect(e.x-10,e.y-16,20,4);
        ctx.fillRect(e.x-4,e.y-16,8,26);
        ctx.fillRect(e.x-2,e.y-26,4,10);
        ctx.fillRect(e.x-9,e.y-8,4,8);
        ctx.fillRect(e.x+5,e.y-8,4,8);
    }
}

export function drawCockpit(ctx,score,speed){
    ctx.fillStyle="black";
    ctx.fillRect(0,560,480,80);

    ctx.fillStyle="#00ff00";
    ctx.font="16px monospace";
    ctx.fillText("TIME: "+score,300,590);
    ctx.fillText("KMH: "+Math.floor(speed*40),300,610);
    // áreas de controle visual
ctx.fillStyle="rgba(255,255,255,0.05)";
ctx.fillRect(0,0,240,640);
ctx.fillRect(240,0,240,640);

}
