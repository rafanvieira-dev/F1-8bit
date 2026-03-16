const spritePlayer = new Image(); spritePlayer.src = './assets/player.png';
const spriteEnemy1 = new Image(); spriteEnemy1.src = './assets/enemy1.png';
const spriteEnemy2 = new Image(); spriteEnemy2.src = './assets/enemy2.png';
const spriteTrack = new Image(); spriteTrack.src = './assets/track.png';
const spriteDriver = new Image(); spriteDriver.src = './assets/driver.png';

const enemySprites = [spriteEnemy1, spriteEnemy2];

export function drawTrack(ctx, track) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    if (spriteTrack.complete) {
        ctx.drawImage(spriteTrack, 0, track.offset, w, h);
        ctx.drawImage(spriteTrack, 0, track.offset - h, w, h);
    }
}

export function drawGameOverScreen(ctx, score, message) {
    const w = ctx.canvas.width; const h = ctx.canvas.height;
    ctx.fillStyle = "rgba(0,0,0,0.9)"; ctx.fillRect(0, 0, w, h);
    if (spriteDriver.complete) ctx.drawImage(spriteDriver, w / 2 - 120, h / 2 - 300, 240, 360);
    ctx.textAlign = "center";
    ctx.fillStyle = "#00d0ff"; ctx.font = "italic bold 20px monospace";
    ctx.fillText(`"${message}"`, w / 2, h / 2 + 100);
    ctx.fillStyle = "#fff"; ctx.font = "bold 36px monospace";
    ctx.fillText("GAME OVER", w / 2, h / 2 + 160);
    ctx.fillStyle = "#ffd400"; ctx.font = "bold 24px monospace";
    ctx.fillText(`PONTOS: ${Math.floor(score)}`, w / 2, h / 2 + 200);
}

export function drawHUD(ctx, score, level, speed) {
    ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0, 0, ctx.canvas.width, 50);
    ctx.fillStyle = "#ffd400"; ctx.font = "bold 18px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`PTS: ${Math.floor(score)}  LVL: ${level}  ${speed} KM/H`, 20, 32);
}

// Carro ajustado para 50x85 para caber na faixa
export function drawCar(ctx, p) { 
    if (spritePlayer.complete) ctx.drawImage(spritePlayer, p.x - 25, p.y - 42, 50, 85); 
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        let s = enemySprites[e.spriteType];
        if (s.complete) ctx.drawImage(s, e.x - 25, e.y - 42, 50, 85);
    }
}

export function drawStartScreen(ctx) {
    ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.font = "bold 50px monospace"; ctx.fillText("F1 32-BIT", ctx.canvas.width/2, ctx.canvas.height/2 - 50);
    ctx.font = "20px monospace"; ctx.fillText("Pressione ACELERAR para iniciar", ctx.canvas.width/2, ctx.canvas.height/2 + 50);
}
