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
    if (spriteDriver.complete) ctx.drawImage(spriteDriver, w / 2 - 100, h / 2 - 250, 200, 300);
    ctx.textAlign = "center";
    ctx.fillStyle = "#00d0ff"; ctx.font = "italic bold 18px monospace";
    ctx.fillText(`"${message}"`, w / 2, h / 2 + 80);
    ctx.fillStyle = "#fff"; ctx.font = "bold 32px monospace";
    ctx.fillText("GAME OVER", w / 2, h / 2 + 130);
    ctx.fillStyle = "#ffd400"; ctx.fillText(`PONTOS: ${Math.floor(score)}`, w / 2, h / 2 + 170);
}

export function drawHUD(ctx, score, level, speed) {
    ctx.fillStyle = "rgba(0,0,0,0.8)"; ctx.fillRect(0, 0, ctx.canvas.width, 45);
    ctx.fillStyle = "#ffd400"; ctx.font = "bold 16px monospace";
    ctx.fillText(`PTS: ${Math.floor(score)}  LVL: ${level}  ${speed} KM/H`, 20, 28);
}

export function drawCar(ctx, p) { if (spritePlayer.complete) ctx.drawImage(spritePlayer, p.x - 30, p.y - 50, 60, 100); }
export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        let s = enemySprites[e.spriteType];
        if (s.complete) ctx.drawImage(s, e.x - 30, e.y - 50, 60, 100);
    }
}
export function drawStartScreen(ctx) {
    ctx.fillStyle = "rgba(0,0,0,0.8)"; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.font = "bold 40px monospace"; ctx.fillText("F1 32-BIT", ctx.canvas.width/2, ctx.canvas.height/2);
}
