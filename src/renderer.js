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
    ctx.fillRect(player.x-8,player.y-16,16,32);
}

export function drawEnemies(ctx,enemies){
    ctx.fillStyle="yellow";
    for(let e of enemies.list){
        ctx.fillRect(e.x-8,e.y-16,e.w,e.h);
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
