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

// mobile
const leftBtn=document.getElementById("leftBtn");
const rightBtn=document.getElementById("rightBtn");

function press(btn,dir){
    btn.addEventListener("touchstart",e=>{
        e.preventDefault();
        input[dir]=true;
    });

    btn.addEventListener("touchend",()=>{
        input[dir]=false;
    });
}

if(leftBtn && rightBtn){
    press(leftBtn,"left");
    press(rightBtn,"right");
}
