export const input = {
    left:false,
    right:false
};

let pressed = {
    left:false,
    right:false
};

const canvas = document.getElementById("game");

/* ===== TECLADO ===== */

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowLeft" && !pressed.left){
        input.left = true;
        pressed.left = true;
    }

    if(e.key==="ArrowRight" && !pressed.right){
        input.right = true;
        pressed.right = true;
    }
});

document.addEventListener("keyup",e=>{

    if(e.key==="ArrowLeft") pressed.left=false;
    if(e.key==="ArrowRight") pressed.right=false;
});


/* ===== TOQUE (1 toque = 1 ação) ===== */

canvas.addEventListener("touchstart",e=>{
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const mid = rect.width/2;

    if(x < mid){
        input.left = true;
    }else{
        input.right = true;
    }

},{passive:false});


/* ===== LIMPA O INPUT A CADA FRAME ===== */
export function resetInput(){
    input.left=false;
    input.right=false;
}
