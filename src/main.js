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
let supportMessage = "";

// Lista de mensagens de apoio
const messages = [
    "Boa pilotagem!",
    "Continue assim!",
    "Você pode melhorar!",
    "Quase lá! Tente de novo.",
    "Mantenha o foco!",
    "Grande pilotagem, campeão!",
    "Acelere com sabedoria!",
    "A vitória vem com treino."
];

document.addEventListener("keydown", (e) => {
    if (e.key === "p" && gameState === "PLAYING") paused = !paused;
    if (e.key.toLowerCase() === "r" && gameState === "GAMEOVER") location.reload();
});

canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER") location.reload();
});

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) gameState = "PLAYING";
        return;
    }

    if (gameState === "GAMEOVER" || paused) return;

    player.update(input);
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    if (player.crashed) {
        gameState = "GAMEOVER";
        // Sorteia a mensagem ao bater
        supportMessage = messages[Math.floor(Math.random() * messages.length)];
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
