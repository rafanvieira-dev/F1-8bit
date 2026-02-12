/* ===================== PISTA ===================== */
export function drawTrack(ctx,track){

    const left = track.roadLeft;
    const width = track.roadWidth;
    const right = left + width;
    const h = ctx.canvas.height;

    // asfalto
    ctx.fillStyle="#3a3a3a";
    ctx.fillRect(left,0,width,h);

    // zebra lateral (vermelho/branco)
    for(let y=track.offset%40;y<h;y+=40){

        ctx.fillStyle="#ff0000";
        ctx.fillRect(left,y,10,20);
        ctx.fillRect(right-10,y,10,20);

        ctx.fillStyle="#ffffff";
        ctx.fillRect(left,y+20,10,20);
        ctx.fillRect(right-10,y+20,10,20);
    }

    // linhas centrais (divisões das 4 faixas)
    ctx.fillStyle="#ffffff";

    for(let i=1;i<track.lanes;i++){

        const x = left + i*track.laneWidth;

        for(let y=track.offset%60;y<h;y+=60){
            ctx.fillRect(x-2,y,4,30);
        }
    }
}


/* ===================== CARRO F1 PIXEL ===================== */
function drawF1(ctx,x,y,main,second,visor){

    // sombra
    ctx.fillStyle="#00000055";
    ctx.fillRect(x-14,y+22,28,6);

    // asa traseira
    ctx.fillStyle=second;
    ctx.fillRect(x-18,y-6,36,4);

    // corpo
    ctx.fillStyle=main;
    ctx.fillRect(x-6,y-10,12,34);

    // cockpit
    ctx.fillStyle=visor;
    ctx.fillRect(x-4,y,8,10);

    // nariz
    ctx.fillRect(x-3,y-18,6,10);

    // asa dianteira
    ctx.fillStyle=second;
    ctx.fillRect(x-16,y-20,32,4);

    // rodas
    ctx.fillStyle="#000";
    ctx.fillRect(x-14,y+10,6,10);
    ctx.fillRect(x+8,y+10,6,10);
    ctx.fillRect(x-14,y-6,6,10);
    ctx.fillRect(x+8,y-6,6,10);
}


/* ===================== PLAYER — McLaren Senna ===================== */
export function drawCar(ctx,p){
    drawF1(ctx,p.x,p.y,"#ffffff","#e10600","#00d0ff");
}


/* ===================== INIMIGOS ===================== */
export function drawEnemies(ctx,track){
    for(const e of track.enemies){
        drawF1(ctx,e.x,e.y,"#0033cc","#ffd400","#00d0ff");
    }
}


/* ===================== HUD ARCADE ===================== */
export function drawCockpit(ctx,score,speed,record){

    ctx.fillStyle="white";
    ctx.font="14px monospace";

    ctx.fillText(`KMH ${speed}`,10,20);
    ctx.fillText(`SCORE ${score}`,10,40);

    if(record)
        ctx.fillText(`BEST ${record}`,10,60);
}
