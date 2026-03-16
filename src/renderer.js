// ... mantenha o carregamento das outras sprites ...
const spriteTrack = new Image();
spriteTrack.src = './assets/track.png';

// NOVA SPRITE: Carregando a imagem do Mentor
const spriteDriver = new Image();
spriteDriver.src = './assets/driver.png';

const enemySprites = [spriteEnemy1, spriteEnemy2];

// ... mantenha as funções drawTrack e drawStartScreen como estão ...

// NOVA FUNÇÃO: Tela de Game Over com o Mentor e Mensagem
export function drawGameOverScreen(ctx, score, message) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    // Fundo escuro semi-transparente
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(0, 0, w, h);

    // Desenha o Mentor (Ayrton Senna) centralizado
    if (spriteDriver.complete) {
        // Ajuste o tamanho e posição se necessário (x, y, largura, altura)
        ctx.drawImage(spriteDriver, w / 2 - 100, h / 2 - 220, 200, 300);
    }

    ctx.textAlign = "center";
    
    // Balão de fala ou mensagem de apoio
    ctx.fillStyle = "#00d0ff"; // Cor azul claro para o mentor
    ctx.font = "italic bold 20px monospace";
    ctx.fillText(`"${message}"`, w / 2, h / 2 + 110);

    // Texto de Game Over e Pontuação
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px monospace";
    ctx.fillText("GAME OVER", w / 2, h / 2 + 170);

    ctx.fillStyle = "#ffd400";
    ctx.font = "bold 25px monospace";
    ctx.fillText(`PONTOS: ${Math.floor(score)}`, w / 2, h / 2 + 210);

    ctx.fillStyle = "#aaaaaa";
    ctx.font = "16px monospace";
    ctx.fillText("Pressione 'R' para reiniciar", w / 2, h / 2 + 260);
    
    // Restaura o alinhamento padrão
    ctx.textAlign = "left";
}

export function drawHUD(ctx, score, level, speed) {
    // ... mantenha o HUD original ...
}

export function drawCar(ctx, p) {
    if (spritePlayer.complete) {
        // Mantivemos o tamanho original 60x100
        ctx.drawImage(spritePlayer, p.x - 30, p.y - 50, 60, 100);
    }
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        let sprite = (e.spriteType === 0) ? enemySprites[0] : enemySprites[1];
        if (sprite.complete) {
            // Mantivemos o tamanho original 60x100
            ctx.drawImage(sprite, e.x - 30, e.y - 50, 60, 100);
        }
    }
}
