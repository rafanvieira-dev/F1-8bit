export class Track {

    constructor(canvas) {
        this.canvas = canvas;
        this.offset = 0;
        
        this.roadWidth = canvas.width * 0.70;
        this.roadLeft = (canvas.width - this.roadWidth) / 2;
        
        this.lanesCount = 4;
        this.laneWidth = this.roadWidth / this.lanesCount;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(player, level) {
        // A pista rola para baixo baseada na velocidade do player
        let visualSpeed = player.speed * 0.05; 
        
        this.offset += visualSpeed;
        if (this.offset >= this.canvas.height) {
            this.offset -= this.canvas.height; 
        }

        // Sistema de tempo para criar a próxima "onda" de carros
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(level);
            // O tempo entre as ondas diminui conforme o level e a sua velocidade
            // O Math.max(45) garante que as ondas nunca nasçam coladas uma na outra
            this.spawnTimer = Math.max(45, 120 - (level * 5) - (player.speed * 0.1));
        }

        for (const e of this.enemies) {
            // ESTILO TETRIS: O inimigo cai com a própria velocidade SOMADA à velocidade que você está correndo
            e.y += e.baseSpeed + visualSpeed;

            // Verificação de colisão
            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        // Limpa inimigos que já passaram do fundo da tela
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 150);
    }

    spawnEnemies(level) {
        // Define quantos carros vão nascer nesta onda (mínimo 1, máximo 3)
        // A chance de vir 2 ou 3 carros aumenta com o level. NUNCA 4, para sempre sobrar 1 faixa!
        let maxCars = 1 + Math.floor(Math.random() * (level / 3 + 1));
        if (maxCars > 3) maxCars = 3;
        if (maxCars < 1) maxCars = 1;

        // Cria uma lista com as 4 faixas [0, 1, 2, 3] e embaralha para escolher aleatoriamente onde os carros não vão estar
        let availableLanes = [0, 1, 2, 3];
        availableLanes.sort(() => Math.random() - 0.5);
        
        // Pega apenas a quantidade de faixas sorteadas
        let chosenLanes = availableLanes.slice(0, maxCars);

        // Velocidade de queda base dos inimigos aumenta com o level
        let fallSpeed = 3 + (level * 0.8);

        // Cria os carros em bloco (onda) nas faixas sorteadas
        for (let lane of chosenLanes) {
            let spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            this.enemies.push({
                x: spawnX,
                y: -150, // Nascem todos alinhados lá em cima, de fora da tela
                baseSpeed: fallSpeed, 
                spriteType: Math.random() > 0.5 ? 0 : 1 // Sorteia a cor (verde ou azul) 50/50
            });
        }
    }
}
