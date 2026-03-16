function update() {
    // ... (resto do código igual)

    if (gameState === "GAMEOVER" || paused) return;

    // CORREÇÃO: Passar o 'level' para o player atualizar a velocidade máxima
    player.update(input, level); 
    track.update(player, level); 

    // A pontuação sobe conforme a velocidade
    score += player.speed * 0.015;
    
    // Ajusta a dificuldade: a cada 500 pontos sobe um nível
    level = Math.floor(score / 500) + 1; 

    if (player.crashed) {
        gameState = "GAMEOVER";
    }
}
