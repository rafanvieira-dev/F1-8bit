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

/* ===== CARRO F1 DETALHADO ===== */
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

/* ===== PLAYER — McLaren Senna ===== */
export function drawCar(ctx,p){
    drawF1(
        ctx,
        p.x,
        p.y,
        "#ffffff",   // corpo branco
        "#e10600",   // asas vermelhas
        "#00d0ff"    // visor azul
    );
}

/* ===== INIMIGOS — azul e amarelo ===== */
export function drawEnemies(ctx,track){
    for(const e of track.enemies){
        drawF1(
            ctx,
            e.x,
            e.y,
            "#0033cc", // azul
            "#ffd400", // amarelo
            "#00d0ff"
        );
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
