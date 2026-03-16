import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
// Importe a nova função de renderização
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// MANTEMOS A RESOLUÇÃO ORIGINAL PARA NÃO DAR ZOOM
const GAME_WIDTH = window.innerWidth > window.innerHeight ? 720 : 360;
const GAME_HEIGHT = window.innerWidth > window.innerHeight ? 900 : 640;

function resize() {
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
}
resize();
window.addEventListener("resize", resize);

const track = new Track(canvas);
const player = new Player(track);

let gameState = "START"; 
let score = 0;
let level = 1;
let paused = false;

// NOVA VARIÁVEL E LISTA: Mensagens de apoio do Mentor
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
    // Atalho para reiniciar
    if (e.key.toLowerCase() === "r" && gameState === "GAMEOVER") location.reload();
});

// Suporte para reiniciar no Touch
canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER") location.reload();
});

function update() {
    // ... mantenha a lógica de START ...

    player.update(input, level); 
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    // LÓGICA DE MENSAGEM: Quando bate, escolhe uma mensagem aleatória
    if (player.crashed) {
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

    // NOVA TELA: Game Over com o Mentor e a mensagem sorteada
    if (gameState === "GAMEOVER") {
        drawGameOverScreen(ctx, score, supportMessage);
    }
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}
loop();
