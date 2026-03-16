import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen } from "./renderer.js";

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

document.addEventListener("keydown", (e) => {
    if (e.key === "p" && gameState === "PLAYING") paused = !paused;
    if (e.key.toLowerCase() === "r" && gameState === "GAMEOVER") location.reload();
});

canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER") location.reload();
});

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) {
            gameState = "PLAYING";
        }
        return;
    }

    if (gameState === "GAMEOVER" || paused) return;

    // CORREÇÃO: Passar o 'level' para o player atualizar a velocidade máxima
    player.update(input, level);
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    if (player.crashed) {
        gameState = "GAMEOVER";
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
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 36px monospace";
        ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
        ctx.fillStyle = "#ffd400";
        ctx.font = "bold 24px monospace";
        ctx.fillText(`PONTOS: ${Math.floor(score)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
        ctx.fillStyle = "#aaaaaa";
        ctx.font = "16px monospace";
        ctx.fillText("Toque na tela ou 'R' para reiniciar", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80);
        ctx.textAlign = "left";
    }
}

function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
