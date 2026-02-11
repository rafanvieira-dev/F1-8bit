export const input={
    left:false,
    right:false
};

// teclado
window.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft") input.left=true;
    if(e.key==="ArrowRight") input.right=true;
});

window.addEventListener("keyup",e=>{
    if(e.key==="ArrowLeft") input.left=false;
    if(e.key==="ArrowRight") input.right=false;
});

// mobile touch
function bind(btn,dir){
    if(!btn) return;

    const start=()=>input[dir]=true;
    const end=()=>input[dir]=false;

    btn.addEventListener("touchstart",start,{passive:false});
    btn.addEventListener("touchend",end);
    btn.addEventListener("touchcancel",end);

    // funciona também como clique
    btn.addEventListener("mousedown",start);
    btn.addEventListener("mouseup",end);
    btn.addEventListener("mouseleave",end);
}

bind(document.getElementById("leftBtn"),"left");
bind(document.getElementById("rightBtn"),"right");
