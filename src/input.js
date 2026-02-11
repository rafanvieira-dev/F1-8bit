export const input={
    left:false,
    right:false
};

// teclado
document.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft") input.left=true;
    if(e.key==="ArrowRight") input.right=true;
});

document.addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft") input.left=false;
    if(e.key==="ArrowRight") input.right=false;
});

// toque (lado da tela)
document.addEventListener("touchstart",e=>{
    const x=e.touches[0].clientX;

    if(x < window.innerWidth/2){
        input.left=true;
    }else{
        input.right=true;
    }
});

document.addEventListener("touchend",()=>{
    input.left=false;
    input.right=false;
});
