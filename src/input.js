export const input = {
    left: false,
    right: false,
    touch: false
};

let keyCooldown = 0;  // Controla a sensibilidade do teclado
const canvas = document.getElementById("game");

// teclado
document.addEventListener("keydown", (e) => {
    if (keyCooldown > 0) return; // Impede múltiplos toques rapidamente

    if (e.key === "ArrowLeft") {
        input.left = true;
        keyCooldown = 10; // Intervalo de tempo entre os comandos
    }

    if (e.key === "ArrowRight") {
        input.right = true;
        keyCooldown = 10; // Intervalo de tempo entre os comandos
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowRight") input.right = false;
});

// Aumenta o cooldown do teclado
setInterval(() => {
    if (keyCooldown > 0) keyCooldown--; // Reduz o cooldown do teclado a cada 100ms
}, 100);

// controle de toque
canvas.addEventListener("touchstart", touch, { passive: false });
canvas.addEventListener("touchmove", touch, { passive: false });
canvas.addEventListener("touchend", () => {
    input.left = false;
    input.right = false;
    input.touch = false;
});

function touch(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const mid = rect.width / 2;

    if (x < mid) {
        input.left = true;
        input.right = false;
    } else {
        input.right = true;
        input.left = false;
    }

    input.touch = true; // Marca que há um toque ativo
}
