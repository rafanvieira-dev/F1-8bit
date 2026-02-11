export function drawTrack(ctx,track){

    // asfalto
    ctx.fillStyle="#3a3a3a";
    ctx.fillRect(120,0,240,640);

    // bordas vermelhas/brancas
    for(let y=track.offset%40; y<640; y+=40){

        ctx.fillStyle="#ff0000";
        ctx.fillRect(120,y,10,20);
        ctx.fillRect(350,y,10,20);

        ctx.fillStyle="#ffffff";
        ctx.fillRect(120,y+20,10,20);
        ctx.fillRect(350,y+20,10,20);
    }

    // linhas centrais (tracejadas)
    ctx.fillStyle="#ffffff";
    for(let y=track.offset%60; y<640; y+=60){
        ctx.fillRect(238,y,4,30);
    }
}
