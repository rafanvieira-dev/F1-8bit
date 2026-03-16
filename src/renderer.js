// Carregando as imagens
const spritePlayer = new Image();
spritePlayer.src = './assets/player.png';

const spriteEnemy1 = new Image();
spriteEnemy1.src = './assets/enemy1.png';

const spriteEnemy2 = new Image();
spriteEnemy2.src = './assets/enemy2.png';

// Array para sortear os inimigos
const enemySprites = [spriteEnemy1, spriteEnemy2];

// ================= PISTA =================
export function drawTrack(ctx, track) {
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(track.roadLeft, 0, track.roadWidth, 640);

    /* bordas */
    for (let y = track.offset % 40; y < 640; y += 40) {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(track.roadLeft, y, 10, 20);
        ctx.fillRect(track.roadLeft + track.roadWidth - 10, y, 20);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(track.roadLeft, y + 20, 10, 20);
        ctx.fillRect(track.roadLeft + track.roadWidth - 10, y + 20, 10, 20);
    }

    /* divisórias */
    ctx.fillStyle = "#ffffff";
    for (let i = 1; i < track.lanesCount; i++) {
        const x = track.roadLeft + track.laneWidth * i;
        for (let y = track.offset % 60; y < 640; y += 60)
            ctx.fillRect(x - 2, y, 4, 30);
    }
}

// ================= HUD =================
export function drawHUD(ctx, time, speed) {
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText(`Tempo: ${time}s`, 10, 20);
    ctx.fillText(`Vel: ${speed} kmh`, 10, 40);
}


// ================= CARROS =================
// Fallback: mantém o desenho antigo caso a imagem falhe ou demore a carregar
function drawF1(ctx, x, y, main, second, visor) {
    ctx.fillStyle = second;
    ctx.fillRect(x - 18, y - 6, 36, 4);
    ctx.fillStyle = main;
    ctx.fillRect(x - 6, y - 10, 12, 34);
    ctx.fillStyle = visor;
    ctx.fillRect(x - 4, y, 8, 10);
    ctx.fillRect(x - 3, y - 18, 6, 10);
    ctx.fillStyle = "#000";
    ctx.fillRect(x - 14, y + 10, 6, 10);
    ctx.fillRect(x + 8, y + 10, 6, 10);
    ctx.fillRect(x - 14, y - 6, 6, 10);
    ctx.fillRect(x + 8, y - 6, 6, 10);
}

export function drawCar(ctx, p) {
    if (spritePlayer.complete && spritePlayer.naturalWidth !== 0) {
        // Ajuste o 40 e 60 dependendo do tamanho real do seu PNG após recortar
        ctx.drawImage(spritePlayer, p.x - 20, p.y - 30, 40, 60);
    } else {
        drawF1(ctx, p.x, p.y, "#ffffff", "#e10600", "#00d0ff");
    }
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        // Escolhe o spriteEnemy1 ou spriteEnemy2 baseado na posição X do inimigo 
        let sprite = (Math.floor(e.x) % 2 === 0) ? enemySprites[0] : enemySprites[1];

        if (sprite.complete && sprite.naturalWidth !== 0) {
            ctx.drawImage(sprite, e.x - 20, e.y - 30, 40, 60);
        } else {
            drawF1(ctx, e.x, e.y, "#0033cc", "#ffd400", "#00d0ff");
        }
    }
}
