import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const isDesktop = window.innerWidth > window.innerHeight;
const isMobile = !isDesktop; // Detecta o modo Mobile

// Resolução interna fixa. O CSS cuidará de ajustar o tamanho na sua tela!
const GAME_WIDTH = 540;
const GAME_HEIGHT = 960;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const track = new Track(canvas);
const player = new Player(track);

let gameState = "START"; 
let score = 0;
let level = 1;
let paused = false;
let supportMessage = "";

const messages = [
    "Boa pilotagem!",
    "Continue assim!",
    "Você pode melhorar!",
    "Quase lá! Tente de novo.",
    "Mantenha o foco!",
    "Grande pilotagem, campeão!",
    "Acelere com sabedoria!",
    "O treino leva à perfeição."
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
        if (input.up || input.touch) gameState = "PLAYING";
        return;
    }
    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    player.update(input, level, isMobile); 
    track.update(player, level, isMobile);

    // Pontuação Base
    score += player.speed * 0.015;

    // Bônus de Pontuação por mudar de faixa (costurar o trânsito)
    if ((input.left || input.right) && player.speed > 0) {
        score += player.speed * 0.012; 
    }

    level = Math.floor(score / 500) + 1;

    if (level >= 100) {
        gameState = "WIN";
        supportMessage = "Parabéns! Sua pilotagem foi impecável. Você ganhou a corrida!";
    } else if (player.crashed) {
        gameState = "GAMEOVER";
        supportMessage = messages[Math.floor(Math.random() * messages.length)];
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrack(ctx, track);

    if (gameState === "START") {
        drawStartScreen(ctx);
        return;
    }

    drawEnemies(ctx, track);
    drawCar(ctx, player);
    drawHUD(ctx, score, level, Math.floor(player.speed));

    if (gameState === "GAMEOVER" || gameState === "WIN") {
        drawGameOverScreen(ctx, score, supportMessage, gameState === "WIN");
    }
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
