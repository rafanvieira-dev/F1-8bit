/* ===== PISTA ===== */
export function drawTrack(ctx,track){

    ctx.fillStyle="#3a3a3a";
    ctx.fillRect(80,0,320,640);

    for(let y=track.offset%40;y<640;y+=40){
        ctx.fillStyle="#ff0000";
        ctx.fillRect(80,y,10,20);
        ctx.fillRect(390,y,10,20);

        ctx.fillStyle="#ffffff";
        ctx.fillRect(80,y+20,10,20);
        ctx.fillRect(390,y+20,10,20);
    }

    ctx.fillStyle="#ffffff";

    // divisórias das 4 faixas
    for(let y=track.offset%60;y<640;y+=60){
        ctx.fillRect(160,y,4,30);
        ctx.fillRect(240,y,4,30);
        ctx.fillRect(320,y,4,30);
    }
}

/* ===== CARRO F1 ===== */
function drawF1(ctx,x,y,main,second,visor){

    ctx.fillStyle="#00000055";
    ctx.fillRect(x-14,y+22,28,6);

    ctx.fillStyle=second;
    ctx.fillRect(x-18,y-6,36,4);

    ctx.fillStyle=main;
    ctx.fillRect(x-6,y-10,12,34);

    ctx.fillStyle=visor;
    ctx.fillRect(x-4,y,8,10);

    ctx.fillRect(x-3,y-18,6,10);

    ctx.fillStyle=second;
    ctx.fillRect(x-16,y-20,32,4);

    ctx.fillStyle="#000";
    ctx.fillRect(x-14,y+10,6,10);
    ctx.fillRect(x+8,y+10,6,10);
    ctx.fillRect(x-14,y-6,6,10);
    ctx.fillRect(x+8,y-6,6,10);
}

/* ===== PLAYER ===== */
export function drawCar(ctx,p){
    drawF1(ctx,p.x,p.y,"#ffffff","#e10600","#00d0ff");
}

/* ===== INIMIGOS ===== */
export function drawEnemies(ctx,track){
    for(const e of track.enemies){
        drawF1(ctx,e.x,e.y,"#0033cc","#ffd400","#00d0ff");
    }
}

/* ===== HUD (PONTOS / TEMPO / RECORDE) ===== */
export function drawHUD(ctx,time,speed,record){

    ctx.fillStyle="white";
    ctx.font="12px monospace";

    ctx.fillText(`Tempo: ${time}s`,10,20);
    ctx.fillText(`Vel: ${speed} kmh`,10,40);

    if(record){
        ctx.fillText(`REC ${record.name} ${record.speed}kmh`,10,60);
    }
}
