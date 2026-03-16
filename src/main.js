import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const isDesktop = window.innerWidth > window.innerHeight;
const isMobile = !isDesktop; // NOVO: Detecção para o modo Mobile
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

let supportMessage = "";
const tips = [
    "Dica: Antecipe os seus movimentos.",
    "Boa pilotagem! Treine seus reflexos.",
    isMobile ? "Aceleração Automática ativada! Foco na direção." : "Atenção aos carros rápidos que vêm de trás!",
    "Continue assim! Seus reflexos estão ótimos.",
    "Cada erro é uma lição na F1.",
    "Você tem talento! Só precisa de mais pista.",
    "O carro está perfeito, acredite no seu tempo de reação."
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
        // Tocar na tela ou pressionar para cima inicia o jogo
        if (input.up || input.touch) {
            gameState = "PLAYING";
        }
        return;
    }

    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    // NOVO: Passando isMobile para alterar o comportamento
    player.update(input, level, isMobile);
    track.update(player, level, isMobile);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

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
        drawGameOverScreen(ctx, score, supportMessage, gameState === "WIN");
    }
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
