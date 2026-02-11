export function drawTrack(ctx, track){
    ctx.fillStyle="#2b2b2b";
    ctx.fillRect(120,0,240,640);

    ctx.fillStyle="#ffffff";
    for(let i=0;i<20;i++){
        ctx.fillRect(238,(i*40-track.offset%40),4,20);
    }
}

export function drawCar(ctx, player){
    ctx.fillStyle="red";

    // asa traseira
    ctx.fillRect(player.x-10,player.y-16,20,4);

    // corpo
    ctx.fillRect(player.x-4,player.y-16,8,26);

    // nariz
    ctx.fillRect(player.x-2,player.y-26,4,10);

    // rodas
    ctx.fillRect(player.x-9,player.y-8,4,8);
    ctx.fillRect(player.x+5,player.y-8,4,8);
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
