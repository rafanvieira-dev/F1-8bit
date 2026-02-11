export const input = {
    left:false,
    right:false
};

window.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft") input.left=true;
    if(e.key==="ArrowRight") input.right=true;
});

window.addEventListener("keyup", e=>{
    if(e.key==="ArrowLeft") input.left=false;
    if(e.key==="ArrowRight") input.right=false;
});

