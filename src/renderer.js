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

function drawF1(ctx,x,y,color){

    ctx.fillStyle=color;
    ctx.fillRect(x-6,y-10,12,34);

    ctx.fillStyle="#111";
    ctx.fillRect(x-18,y-6,36,4);
    ctx.fillRect(x-16,y-20,32,4);

    ctx.fillStyle="#000";
    ctx.fillRect(x-14,y+10,6,10);
    ctx.fillRect(x+8,y+10,6,10);
    ctx.fillRect(x-14,y-6,6,10);
    ctx.fillRect(x+8,y-6,6,10);
}

export function drawCar(ctx,p){
    drawF1(ctx,p.x,p.y,"#e10600");
}

export function drawEnemies(ctx,track){
    for(const e of track.enemies){
        drawF1(ctx,e.x,e.y,"#ffffff");
    }
}

export function drawHUD(ctx,time,speed,record){
    ctx.fillStyle="white";
    ctx.font="12px monospace";
    ctx.fillText(`Tempo: ${time}s`,10,20);
    ctx.fillText(`Vel: ${speed}`,10,40);

    if(record)
        ctx.fillText(`REC ${record.name} ${record.time}s`,10,60);
}
