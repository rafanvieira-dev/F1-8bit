// Carregando as imagens
const spritePlayer = new Image();
spritePlayer.src = './assets/player.png';

const spriteEnemy1 = new Image();
spriteEnemy1.src = './assets/enemy1.png';

const spriteEnemy2 = new Image();
spriteEnemy2.src = './assets/enemy2.png';

// Array para sortear os inimigos
const enemySprites = [spriteEnemy1, spriteEnemy2];

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
        // (uma gambiarra simples para eles variarem sem precisarmos mexer no track.js)
        let sprite = (Math.floor(e.x) % 2 === 0) ? enemySprites[0] : enemySprites[1];

        if (sprite.complete && sprite.naturalWidth !== 0) {
            ctx.drawImage(sprite, e.x - 20, e.y - 30, 40, 60);
        } else {
            drawF1(ctx, e.x, e.y, "#0033cc", "#ffd400", "#00d0ff");
        }
    }
}
