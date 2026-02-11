export const input={left:false,right:false};

const canvas=document.getElementById("game");

// teclado
document.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft") input.left=true;
    if(e.key==="ArrowRight") input.right=true;
});

document.addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft") input.left=false;
    if(e.key==="ArrowRight") input.right=false;
});

// toque
canvas.addEventListener("touchstart",touch,{passive:false});
canvas.addEventListener("touchmove",touch,{passive:false});
canvas.addEventListener("touchend",()=>{input.left=false;input.right=false;});

function touch(e){
    e.preventDefault();
    const rect=canvas.getBoundingClientRect();
    const x=e.touches[0].clientX-rect.left;
    const mid=rect.width/2;

    input.left=x<mid;
    input.right=x>=mid;
}
