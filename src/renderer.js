/* ===== PISTA ===== */
export function drawTrack(ctx,track){

    const h = track.canvas.height;
    const roadLeft = track.roadLeft;
    const roadWidth = track.roadWidth;
    const right = roadLeft + roadWidth;

    // asfalto
    ctx.fillStyle="#3a3a3a";
    ctx.fillRect(roadLeft,0,roadWidth,h);

    // zebras laterais
    for(let y=track.offset%40;y<h;y+=40){

        ctx.fillStyle="#ff0000";
        ctx.fillRect(roadLeft,y,10,20);
        ctx.fillRect(right-10,y,10,20);

        ctx.fillStyle="#ffffff";
        ctx.fillRect(roadLeft,y+20,10,20);
        ctx.fillRect(right-10,y+20,10,20);
    }

    // divisórias das faixas
    ctx.fillStyle="#ffffff";

    for(let i=1;i<track.lanesCount;i++){

        const x = roadLeft + track.laneWidth*i;

        for(let y=track.offset%60;y<h;y+=60){
            ctx.fillRect(x-2,y,4,30);
        }
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

/* ===== HUD ===== */
export function drawHUD(ctx,time,speed,record){

    ctx.fillStyle="white";
    ctx.font="14px monospace";

    ctx.fillText(`Tempo: ${time}s`,20,30);
    ctx.fillText(`Vel: ${speed} kmh`,20,55);

    if(record){
        ctx.fillText(`REC ${record.name} ${record.kmh}kmh`,20,80);
    }
}
