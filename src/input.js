export const input={
    left:false,
    right:false
};

// teclado (continua funcionando no PC)
window.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft") input.left=true;
    if(e.key==="ArrowRight") input.right=true;
});

window.addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft") input.left=false;
    if(e.key==="ArrowRight") input.right=false;
});

// 📱 CONTROLE POR TOQUE NA TELA
function handleTouch(x){
    const middle = window.innerWidth/2;

    input.left = x < middle;
    input.right = x >= middle;
}

window.addEventListener("touchstart",e=>{
    handleTouch(e.touches[0].clientX);
},{passive:false});

window.addEventListener("touchmove",e=>{
    handleTouch(e.touches[0].clientX);
},{passive:false});

window.addEventListener("touchend",()=>{
    input.left=false;
    input.right=false;
});
