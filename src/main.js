import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* detectar desktop */
const isDesktop = window.innerWidth > window.innerHeight;

/* resolução base dinâmica */
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

let start = Date.now();
let gameOver = false;
let record = JSON.parse(localStorage.getItem("f1record"));

let paused = false;
document.addEventListener("keydown", (e) => {
    if (e.key === "p") paused = !paused;
});

/* ================= FIM DE JOGO ================= */
function saveRecord() {
    const time = ((Date.now() - start) / 1000).toFixed(1);
    const kmh = Math.floor(player.speed);

    if (!record || kmh > record.kmh) {
        let name = prompt("NOVO RECORDE! 3 letras:");
        if (!name) name = "???";

        record = {
            name: name.substring(0, 3).toUpperCase(),
            time,
            kmh
        };

        localStorage.setItem("f1record", JSON.stringify(record));
    }
}

/* ================= UPDATE ================= */
function update() {
    if (gameOver || paused) return;

    player.update(input);
    track.update(player);

    if (player.crashed) {
        gameOver = true;
        saveRecord();
    }
}

/* ================= RENDER ================= */
function render() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    drawTrack(ctx, track);
    drawEnemies(ctx, track);
    drawCar(ctx, player);

    const time = ((Date.now() - start) / 1000).toFixed(1);
    drawHUD(ctx, time, Math.floor(player.speed), record);

    if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.fillStyle = "white";
        ctx.font = "28px monospace";
        ctx.fillText("GAME OVER", GAME_WIDTH / 2 - 90, GAME_HEIGHT / 2);

        ctx.font = "16px monospace";
        ctx.fillText("Pressione R para reiniciar", GAME_WIDTH / 2 - 110, GAME_HEIGHT / 2 + 40);
    }
}

document.addEventListener("keydown", (e) => {
    if (gameOver && e.key.toLowerCase() === "r")
        location.reload();
});

/* ================= LOOP ================= */
function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
