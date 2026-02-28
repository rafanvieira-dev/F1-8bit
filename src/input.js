export const input = {
    left: false,
    right: false,
    up: false,
    down: false,
    touch: false
};

const canvas = document.getElementById("game");

// Teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") input.left = true;
    if (e.key === "ArrowRight") input.right = true;
    if (e.key === "ArrowUp") input.up = true;
    if (e.key === "ArrowDown") input.down = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") input.left = false;
    if (e.key === "ArrowRight") input.right = false;
    if (e.key === "ArrowUp") input.up = false;
    if (e.key === "ArrowDown") input.down = false;
});

// Controle de toque (Lados da tela viram, segurar acelera automaticamente)
canvas.addEventListener("touchstart", touch, { passive: false });
canvas.addEventListener("touchmove", touch, { passive: false });
canvas.addEventListener("touchend", () => {
    input.left = false;
    input.right = false;
    input.up = false;
    input.down = false;
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

    input.up = true; // No mobile, tocar na tela já acelera
    input.touch = true;
}
