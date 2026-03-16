// ... carregamento de imagens (lembre-se do assets/driver.png) ...
const spriteDriver = new Image();
spriteDriver.src = './assets/driver.png';

// ... funções drawTrack, drawHUD, etc ...

export function drawGameOverScreen(ctx, score, message) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, 0, w, h);

    if (spriteDriver.complete) {
        // Desenha o Mentor centralizado
        ctx.drawImage(spriteDriver, w / 2 - 100, h / 2 - 250, 200, 300);
    }

    ctx.textAlign = "center";
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
