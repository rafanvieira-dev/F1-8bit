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
const bgMusic = new Audio('./assets/music/musica.mp3'); 
bgMusic.loop = true;  
bgMusic.volume = 0.4; 

// NOVOS ÁUDIOS:
const crashSound = new Audio('./assets/music/batida.mp3');
crashSound.volume = 0.8; 

const gameOverMusic = new Audio('./assets/music/gameover.mp3');
gameOverMusic.volume = 0.5;

const victoryMusic = new Audio('./assets/music/vitoria.mp3');
victoryMusic.volume = 0.6;

// ================= DICAS / FRASES DO MENTOR (INSPIRADAS EM SENNA) =================
const tips = [
    // Frases clássicas
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

// Função para forçar o áudio a iniciar na primeira interação real
let musicStarted = false;
function startMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log("Navegador bloqueou o áudio:", e));
        musicStarted = true;
    }
}

// Escuta o primeiro toque na tela ou tecla pressionada
document.addEventListener("keydown", startMusic, { once: true });
canvas.addEventListener("touchstart", startMusic, { once: true });


document.addEventListener("keydown", (e) => {
    if (e.key === "p" && gameState === "PLAYING") {
        paused = !paused;
        if (paused) {
            bgMusic.pause();
        } else {
            bgMusic.play().catch(() => {});
        }
    }
    
    // O jogo dá "reload" na página ao apertar R, o que já para todos os sons automaticamente
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
        }
        return;
    }

    if (gameState === "GAMEOVER" || gameState === "WIN" || paused) return;

    player.update(input, level);
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    // CONDIÇÃO DE VITÓRIA
    if (level >= 100) {
        gameState = "WIN";
        supportMessage = "Parabéns! Sua pilotagem foi impecável. Você ganhou a corrida!";
        
        bgMusic.pause(); 
        victoryMusic.play().catch(() => {}); 
        
    } 
    // CONDIÇÃO DE DERROTA (Batida)
    else if (player.crashed) {
        gameState = "GAMEOVER";
        // Sorteia uma das frases épicas do Senna
        supportMessage = tips[Math.floor(Math.random() * tips.length)];
        
        bgMusic.pause(); 
        
        crashSound.play().catch(() => {});
        gameOverMusic.play().catch(() => {});
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
