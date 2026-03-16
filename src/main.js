// ... importações ...
import { drawTrack, drawCar, drawEnemies, drawHUD, drawStartScreen, drawGameOverScreen } from "./renderer.js";

// ... lógica de resize e inicialização ...

let supportMessage = "";
const messages = [
    "Boa pilotagem!", "Continue assim!", "Você pode melhorar!",
    "Quase lá! Tente de novo.", "Mantenha o foco!",
    "Grande pilotagem, campeão!", "Acelere com sabedoria!"
];

function update() {
    if (gameState === "START") {
        if (input.up || input.touch) gameState = "PLAYING";
        return;
    }

    if (gameState === "GAMEOVER" || paused) return;

    // NOVO: Passando o level para o player atualizar a velocidade máxima
    player.update(input, level); 
    track.update(player, level);

    score += player.speed * 0.015;
    level = Math.floor(score / 500) + 1;

    if (player.crashed) {
        gameState = "GAMEOVER";
        supportMessage = messages[Math.floor(Math.random() * messages.length)];
    }
}

// ... manter o resto do arquivo main.js igual ...
