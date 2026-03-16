const spritePlayer = new Image();
spritePlayer.src = './assets/player.png';

const spriteEnemy1 = new Image();
spriteEnemy1.src = './assets/enemy1.png';

const spriteEnemy2 = new Image();
spriteEnemy2.src = './assets/enemy2.png';

// Adicionando a nova pista gerada
const spriteTrack = new Image();
spriteTrack.src = './assets/track.png';

const enemySprites = [spriteEnemy1, spriteEnemy2];

// ================= PISTA =================
export function drawTrack(ctx, track) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    if (spriteTrack.complete && spriteTrack.naturalWidth !== 0) {
        // Pista descendo
        ctx.drawImage(spriteTrack, 0, track.offset, w, h);
        // Pista "gêmea" grudada em cima para fechar o loop infinito perfeitamente
        ctx.drawImage(spriteTrack, 0, track.offset - h, w, h);
    } else {
        // Fallback caso a imagem não carregue
        ctx.fillStyle = "#2d7a2d";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#3a3a3a";
        ctx.fillRect(track.roadLeft, 0, track.roadWidth, h);

        for (let y = track.offset % 40; y < h + 40; y += 40) {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(track.roadLeft, y, 10, 20);
            ctx.fillRect(track.roadLeft + track.roadWidth - 10, y, 10, 20);

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(track.roadLeft, y + 20, 10, 20);
            ctx.fillRect(track.roadLeft + track.roadWidth - 10, y + 20, 10, 20);
        }

        ctx.fillStyle = "#ffffff";
        for (let i = 1; i < track.lanesCount; i++) {
            const x = track.roadLeft + track.laneWidth * i;
            for (let y = track.offset % 60; y < h + 60; y += 60) {
                ctx.fillRect(x - 2, y, 4, 30);
            }
        }
    }
}

// ================= TELA INICIAL =================
export function drawStartScreen(ctx) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, w, h);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#e10600";
    ctx.font = "bold 70px monospace";
    ctx.fillText("F1", w / 2, h * 0.3);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 50px monospace";
    ctx.fillText("8-BIT", w / 2, h * 0.4);

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "18px monospace";
    ctx.fillText("CONTROLES", w / 2, h * 0.55);
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "14px monospace";
    ctx.fillText("PC: Setas (Virar e Acelerar)", w / 2, h * 0.60);
    ctx.fillText("MOBILE: Toque nos lados", w / 2, h * 0.64);

    if (Math.floor(Date.now() / 600) % 2 === 0) {
        ctx.fillStyle = "#ffd400";
        ctx.font = "bold 16px monospace";
        ctx.fillText("ACELERE PARA INICIAR", w / 2, h * 0.85);
    }
    
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

// ================= HUD =================
export function drawHUD(ctx, score, level, speed) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
    ctx.fillRect(0, 0, ctx.canvas.width, 45);

    ctx.font = "bold 16px monospace";
    ctx.textBaseline = "middle";

    ctx.textAlign = "left";
    ctx.fillStyle = "#ffd400";
    ctx.fillText(`PTS: ${Math.floor(score)}`, 15, 22.5);

    ctx.textAlign = "center";
    ctx.fillStyle = "#00d0ff";
    ctx.fillText(`LEVEL: ${level}`, ctx.canvas.width / 2, 22.5);

    ctx.textAlign = "right";
    ctx.fillStyle = speed >= 210 ? "#ff4444" : "#00ff00"; 
    ctx.fillText(`${speed} KM/H`, ctx.canvas.width - 15, 22.5);

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

// ================= CARROS =================
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
        ctx.drawImage(spritePlayer, p.x - 30, p.y - 50, 60, 100);
    } else {
        drawF1(ctx, p.x, p.y, "#ffffff", "#e10600", "#00d0ff");
    }
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        let sprite = (e.spriteType === 0) ? enemySprites[0] : enemySprites[1];

        if (sprite.complete && sprite.naturalWidth !== 0) {
            ctx.drawImage(sprite, e.x - 30, e.y - 50, 60, 100);
        } else {
            drawF1(ctx, e.x, e.y, "#0033cc", "#ffd400", "#00d0ff");
        }
    }
}
