import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Resolução estilo Arcade/Fliperama
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

// ================= ÁUDIO =================
// Caminho atualizado para a pasta 'music' que está fora da 'assets'
const bgMusic = new Audio('./music/music.mp3'); // Altera 'music.mp3' para o nome exato do teu ficheiro
bgMusic.loop = true;  // A música repete infinitamente
bgMusic.volume = 0.4; // Volume de 0.0 a 1.0 (40% para não abafar os efeitos)

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
    // Sistema de Pause atualizado para pausar/tocar a música também
    if (e.key === "p" && gameState === "PLAYING") {
        paused = !paused;
        if (paused) {
            bgMusic.pause();
        } else {
            bgMusic.play().catch(() => {}); // Retoma a música ao despausar
        }
    }
    
    if (e.key.toLowerCase() === "r" && (gameState === "GAMEOVER" || gameState === "WIN")) {
        location.reload();
    }
});

canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER" || gameState === "WIN") location.reload();
});

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) {
            gameState = "PLAYING";
            // Inicia a música no primeiro comando
            bgMusic.play().catch(e => console.log("Áudio bloqueado pelo navegador:", e));
        }
        return;
    }

    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    player.update(input, level);
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    // Condição de Vitória (Nível 100)
    if (level >= 100) {
        gameState = "WIN";
        supportMessage = "Parabéns! Sua pilotagem foi impecável. Você ganhou a corrida!";
        bgMusic.pause(); // Para a música ao vencer
    } 
    // Condição de Derrota (Batida)
    else if (player.crashed) {
        gameState = "GAMEOVER";
        supportMessage = tips[Math.floor(Math.random() * tips.length)];
        bgMusic.pause(); // Para a música ao bater
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
