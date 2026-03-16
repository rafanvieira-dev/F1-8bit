import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const isDesktop = window.innerWidth > window.innerHeight;
const GAME_WIDTH = isDesktop ? 720 : 360;
const GAME_HEIGHT = isDesktop ? 900 : 640;
let scale = 1;

function resize() {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    scale = Math.min(sw / GAME_WIDTH, sh / GAME_HEIGHT);
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    canvas.style.width = (GAME_WIDTH * scale) + "px";
    canvas.style.height = (GAME_HEIGHT * scale) + "px";
}

resize();
window.addEventListener("resize", resize);

const track = new Track(canvas);
const player = new Player(track);

let gameState = "START"; 
let score = 0;
let level = 1;
let paused = false;

// Variáveis do Mentor (Senna)
let supportMessage = "";
const tips = [
    "Dica: Solte o acelerador para desviar melhor.",
    "Boa pilotagem! Treine antecipar os movimentos.",
    "Atenção aos carros rápidos que vêm de trás!",
    "Continue assim! Seus reflexos estão ótimos.",
    "Frear também faz parte de uma boa pilotagem.",
    "Você tem talento! Só precisa de mais pista.",
    "Quase lá! Cada erro é uma lição na F1."
];

document.addEventListener("keydown", (e) => {
    if (e.key === "p" && gameState === "PLAYING") paused = !paused;
    if (e.key.toLowerCase() === "r" && (gameState === "GAMEOVER" || gameState === "WIN")) location.reload();
});

canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER" || gameState === "WIN") location.reload();
});

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) {
            gameState = "PLAYING";
        }
        return;
    }

    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    // A física, o limite de 350 km/h e a dificuldade brutal estão seguros aqui
    player.update(input, level);
    track.update(player, level);

    // 1. PONTUAÇÃO BASE: Ganha pontos pela velocidade
    score += player.speed * 0.015;

    // 2. MUDANÇA DE FAIXA (NOVO): Ganha pontos BÔNUS se estiver manobrando / costurando o trânsito
    if ((input.left || input.right) && player.speed > 0) {
        score += player.speed * 0.012; // Acelera muito o ganho de pontos durante a mudança de posição!
    }

    // O nível sobe a cada 500 pontos, trazendo mais inimigos e mais velocidade
    level = Math.floor(score / 500) + 1;

    // MENTOR: Vitória no Nível 100 ou Dicas de apoio no Game Over
    if (level >= 100) {
        gameState = "WIN";
        supportMessage = "Parabéns! Sua pilotagem foi impecável. Você ganhou a corrida!";
    } else if (player.crashed) {
        gameState = "GAMEOVER";
        supportMessage = tips[Math.floor(Math.random() * tips.length)];
    }
}

function render() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    drawTrack(ctx, track);

    if (gameState === "START") {
        drawStartScreen(ctx);
        return;
    }

    drawEnemies(ctx, track);
    drawCar(ctx, player);
    drawHUD(ctx, score, level, Math.floor(player.speed));

    if (gameState === "GAMEOVER" || gameState === "WIN") {
        // Chama a tela especial com a imagem do Senna
        drawGameOverScreen(ctx, score, supportMessage, gameState === "WIN");
    }
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
