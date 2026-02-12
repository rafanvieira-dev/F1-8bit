export const input = {
    left: false,
    right: false
};

let lock = false;  // Prevenir múltiplos toques

const canvas = document.getElementById("game");

// teclado
document.addEventListener("keydown", e => {
    if (lock) return;

    if (e.key === "ArrowLeft") {
        input.left = true;
        lock = true;
    }

    if (e.key === "ArrowRight") {
        input.right = true;
        lock = true;
    }
});

document.addEventListener("keyup", e => {
    input.left = false;
    input.right = false;
    lock = false;
});

// toque mobile
canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;

    if (x < rect.width / 2) input.left = true;
    else input.right = true;

}, { passive: false });

canvas.addEventListener("touchend", () => {
    input.left = false;
    input.right = false;
});
