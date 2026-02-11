export function drawTrack(ctx,track){

    ctx.fillStyle="#3a3a3a";
    ctx.fillRect(120,0,240,640);

    for(let y=track.offset%40;y<640;y+=40){
        ctx.fillStyle="#ff0000";
        ctx.fillRect(120,y,10,20);
        ctx.fillRect(350,y,10,20);

        ctx.fillStyle="#ffffff";
        ctx.fillRect(120,y+20,10,20);
        ctx.fillRect(350,y+20,10,20);
    }

    ctx.fillStyle="#ffffff";
    for(let y=track.offset%60;y<640;y+=60){
        ctx.fillRect(238,y,4,30);
    }
}

export function drawCar(ctx,p){
    const x=p.x,y=p.y;

    ctx.fillStyle="#00000055";
    ctx.fillRect(x-14,y+22,28,6);

    ctx.fillStyle="#111";
    ctx.fillRect(x-18,y-6,36,4);

    ctx.fillStyle="#e10600";
    ctx.fillRect(x-6,y-10,12,34);

    ctx.fillStyle="#00d0ff";
    ctx.fillRect(x-4,y,8,10);

    ctx.fillStyle="#ff2a2a";
    ctx.fillRect(x-3,y-18,6,10);

    ctx.fillStyle="#111";
    ctx.fillRect(x-16,y-20,32,4);

    ctx.fillStyle="#000";
    ctx.fillRect(x-14,y+10,6,10);
    ctx.fillRect(x+8,y+10,6,10);
    ctx.fillRect(x-14,y-6,6,10);
    ctx.fillRect(x+8,y-6,6,10);
}

export function drawHUD(ctx,time,speed,record){
    ctx.fillStyle="white";
    ctx.font="12px monospace";
    ctx.fillText(`Tempo: ${time}s`,10,20);
    ctx.fillText(`Velocidade: ${speed}`,10,40);

    if(record)
        ctx.fillText(`REC ${record.name} ${record.time}s`,10,60);
}
