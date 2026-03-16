// Carrega as imagens dos sprites
const spritePlayer = new Image();
spritePlayer.src = './assets/player.png';

const spriteEnemy = new Image();
spriteEnemy.src = './assets/enemy.png';

// Mantém a função original como fallback (caso a imagem demore a carregar)
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
    // Verifica se a imagem já foi totalmente carregada pelo navegador
    if (spritePlayer.complete && spritePlayer.naturalWidth !== 0) {
        // Desenha a imagem centralizada. 
        // Os valores 36 e 56 representam a largura e altura (ajuste conforme o seu PNG)
        ctx.drawImage(spritePlayer, p.x - 18, p.y - 28, 36, 56);
    } else {
        // Fallback para o desenho antigo enquanto a imagem carrega
        drawF1(ctx, p.x, p.y, "#ffffff", "#e10600", "#00d0ff");
    }
}

export function drawEnemies(ctx, track) {
    for (const e of track.enemies) {
        if (spriteEnemy.complete && spriteEnemy.naturalWidth !== 0) {
            ctx.drawImage(spriteEnemy, e.x - 18, e.y - 28, 36, 56);
        } else {
            drawF1(ctx, e.x, e.y, "#0033cc", "#ffd400", "#00d0ff");
        }
    }
}
