const spritePlayer = new Image();
spritePlayer.src = './assets/player.png';

const spriteEnemy1 = new Image();
spriteEnemy1.src = './assets/enemy1.png';

const spriteEnemy2 = new Image();
spriteEnemy2.src = './assets/enemy2.png';

const spriteTrack = new Image();
spriteTrack.src = './assets/track.png';
spriteTrack.onerror = function() {
    if(spriteTrack.src.includes('track.png')) {
        spriteTrack.src = './assets/track.jpg';
    }
};

// Carregando a imagem do Mentor
const spriteDriver = new Image();
spriteDriver.src = './assets/driver.png';

const enemySprites = [spriteEnemy1, spriteEnemy2];

export function drawTrack(ctx, track) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    if (spriteTrack.complete && spriteTrack.naturalWidth !== 0) {
        ctx.drawImage(spriteTrack, 0, track.offset, w, h);
        ctx.drawImage(spriteTrack, 0, track.offset - h, w, h);
    } else {
        ctx.fillStyle = "#2d7a2d";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#3a3a3a";
        ctx.fillRect(track.roadLeft, 0, track.roadWidth, h);
    }
}

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
    ctx.fillText("32-BIT", w / 2, h * 0.4);
    if (Math.floor(Date.now() / 600) % 2 === 0) {
        ctx.fillStyle = "#ffd400";
        ctx.font = "bold 16px monospace";
        ctx.fillText("ACELERE PARA INICIAR", w / 2, h * 0.85);
    }
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

// NOVA FUNÇÃO: Tela de Game Over com o Piloto Mentor
export function drawGameOverScreen(ctx, score, message) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, 0, w, h);

    if (spriteDriver.complete) {
        // Desenha o piloto no centro
        ctx.drawImage(spriteDriver, w / 2 - 100, h / 2 - 250, 200, 300);
    }

    ctx.textAlign = "center";
    
    // Mensagem de apoio do Mentor
    ctx.fillStyle = "#00d0ff";
    ctx.font = "italic bold 18px monospace";
    ctx.fillText(`"${message}"`, w / 2, h / 2 + 80);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px monospace";
    ctx.fillText("GAME OVER", w / 2, h / 2 + 130);

    ctx.fillStyle = "#ffd400";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`PONTOS: ${Math.floor(score)}`, w / 2, h / 2 + 170);

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "14px monospace";
    ctx.fillText("Pressione 'R' para reiniciar", w / 2, h / 2 + 220);
    
    ctx.textAlign = "left";
}

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

export function drawCar(ctx, p) {
    if (spritePlayer.complete) {
        ctx.drawImage(spritePlayer, p.x - 30, p.y - 50, 60, 100);
    }
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        let sprite = (e.spriteType === 0) ? enemySprites[0] : enemySprites[1];
        if (sprite.complete) {
            ctx.drawImage(sprite, e.x - 30, e.y - 50, 60, 100);
        }
    }
}
