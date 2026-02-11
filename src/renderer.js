export function drawTrack(ctx, track){

    // asfalto
    ctx.fillStyle="#2b2b2b";
    ctx.fillRect(120,0,240,640);

    // linhas centrais
    ctx.fillStyle="#ffffff";
    for(let i=0;i<20;i++){
        ctx.fillRect(238, (i*40 - track.offset%40), 4,20);
    }
}

export function drawCar(ctx, player){
    ctx.fillStyle="red";
    ctx.fillRect(player.x-8, player.y-16, 16,32);
}

export function drawCockpit(ctx, score){
    ctx.fillStyle="black";
    ctx.fillRect(0,560,480,80);

    ctx.fillStyle="#00ff00";
    ctx.font="16px monospace";
    ctx.fillText("TIME: "+score, 350,600);
}

