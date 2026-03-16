import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const isDesktop = window.innerWidth > window.innerHeight;
const isMobile = !isDesktop; // DETECTA MODO MOBILE AQUI

const GAME_WIDTH = isDesktop ? 720 : 360;
const GAME_HEIGHT = isDesktop ? 900 : 640;

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
    if (e.key.toLowerCase() === "r" && gameState === "GAMEOVER") location.reload();
});

// Permite reiniciar tocando na tela após bater
canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER") location.reload();
});

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) gameState = "PLAYING";
        return;
    }
    if (gameState === "GAMEOVER" || paused) return;

    // PASSAMOS O isMobile PARA O CARRO E PARA A PISTA
    player.update(input, level, isMobile); 
    track.update(player, level, isMobile);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

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
