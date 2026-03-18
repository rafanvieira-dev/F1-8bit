import { input } from "./input.js";
import { Player } from "./player.js";
import { Track } from "./track.js";
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen, drawLoadingScreen } from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 540;
const GAME_HEIGHT = 960;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const track = new Track(canvas);
const player = new Player(track);

// O JOGO AGORA COMEÇA NO ESTADO DE LOADING
let gameState = "LOADING"; 
let score = 0;
let level = 1;
let paused = false;
let supportMessage = "";

// ================= ÁUDIO E SISTEMA DE CARREGAMENTO =================
let audiosCarregados = 0;
const totalAudios = 4; // Temos 4 ficheiros de áudio para carregar

function verificarCarregamento() {
    audiosCarregados++;
    // Se todos os 4 áudios estiverem prontos, passa para a tela de START
    if (audiosCarregados >= totalAudios && gameState === "LOADING") {
        gameState = "START";
    }
}

// Criar os áudios e forçar o pré-carregamento ("preload = 'auto'")
const bgMusic = new Audio('./assets/music/musica.mp3'); 
bgMusic.loop = true;  
bgMusic.volume = 0.4; 
bgMusic.preload = 'auto';
bgMusic.addEventListener('canplaythrough', verificarCarregamento, { once: true });

const crashSound = new Audio('./assets/music/batida.mp3');
crashSound.volume = 0.8; 
crashSound.preload = 'auto';
crashSound.addEventListener('canplaythrough', verificarCarregamento, { once: true });

const gameOverMusic = new Audio('./assets/music/gameover.mp3');
gameOverMusic.volume = 0.5;
gameOverMusic.preload = 'auto';
gameOverMusic.addEventListener('canplaythrough', verificarCarregamento, { once: true });

const victoryMusic = new Audio('./assets/music/vitoria.mp3');
victoryMusic.volume = 0.6;
victoryMusic.preload = 'auto';
victoryMusic.addEventListener('canplaythrough', verificarCarregamento, { once: true });

// Sistema de segurança: Se a internet estiver muito lenta ou falhar, 
// força a ida para o START após 4 segundos para o jogador não ficar preso.
setTimeout(() => {
    if (gameState === "LOADING") gameState = "START";
}, 4000);


// ================= DICAS / FRASES DO MENTOR =================
const tips = [
    "O segundo colocado é apenas o primeiro dos perdedores.",
    "Dedicação total: busque o seu último limite e dê o melhor de si.",
    "Você não pode conhecer os seus limites sem testá-los.",
    "Com o poder da mente, você pode chegar onde quiser.",
    "O medo faz parte. O importante é como você o enfrenta.",
    "Tenha sempre como meta muita força e muita determinação.",
    "Correr, competir... eu levo isso no sangue.",
    "Os covardes não tentam, os fracassados não terminam, os vencedores não desistem.",
    "Quando chego a um limite, descubro que tenho forças para ir além.",
    "Cada piloto tem o seu limite. Tente colocar o seu um pouco acima.",
    "Eu sou movido pela vontade de vencer.",
    "Seja quem você for, sempre faça tudo com muito amor e fé.",
    "O limite é uma fronteira criada apenas pela nossa mente.",
    "Para ser bem-sucedido, é preciso ter dedicação total e não aceitar o meio termo.",
    "Atrás de cada curva há um novo desafio a superar. Concentre-se!",
    "Eu nasci para correr. Eu nasci para vencer. Tente de novo!",
    "É preciso ter paixão e brilho nos olhos para chegar ao topo.",
    "Não existe meio termo quando se busca a perfeição na pista.",
    "Acredite que um dia você chega lá. Acelere mais uma vez!",
    "No que diz respeito ao empenho e ao esforço, não existe meio termo."
];

// Iniciar a música na primeira interação
let musicStarted = false;
function startMusic() {
    if (!musicStarted && gameState !== "LOADING") {
        bgMusic.play().catch(e => console.log("Áudio bloqueado:", e));
        musicStarted = true;
    }
}

document.addEventListener("keydown", startMusic, { once: true });
canvas.addEventListener("touchstart", startMusic, { once: true });

document.addEventListener("keydown", (e) => {
    if (e.key === "p" && gameState === "PLAYING") {
        paused = !paused;
        if (paused) bgMusic.pause();
        else bgMusic.play().catch(() => {});
    }
    
    if (e.key.toLowerCase() === "r" && (gameState === "GAMEOVER" || gameState === "WIN")) {
        location.reload();
    }
});

canvas.addEventListener("touchstart", () => {
    if (gameState === "GAMEOVER" || gameState === "WIN") location.reload();
});

function update() {
    // Se ainda está a carregar, não faz nada
    if (gameState === "LOADING") return;

    if (gameState === "START") {
        if (input.up || input.touch) {
            gameState = "PLAYING";
        }
        return;
    }

    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    player.update(input, level);
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    if (level >= 100) {
        gameState = "WIN";
        supportMessage = "Parabéns! Sua pilotagem foi impecável. Você ganhou a corrida!";
        bgMusic.pause(); 
        victoryMusic.play().catch(() => {}); 
    } 
    else if (player.crashed) {
        gameState = "GAMEOVER";
        supportMessage = tips[Math.floor(Math.random() * tips.length)];
        bgMusic.pause(); 
        crashSound.play().catch(() => {});
        gameOverMusic.play().catch(() => {});
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Se estiver no Loading, desenha só a tela de carregamento
    if (gameState === "LOADING") {
        drawLoadingScreen(ctx);
        return;
    }

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
