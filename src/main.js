import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawHUD} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

function resize(){

    const ratio = window.devicePixelRatio || 1;

    /* resolução interna fixa estilo arcade */
    const baseWidth = 480;
    const baseHeight = 640;

    canvas.width = baseWidth * ratio;
    canvas.height = baseHeight * ratio;

    canvas.style.width = baseWidth + "px";
    canvas.style.height = baseHeight + "px";

    ctx.setTransform(ratio,0,0,ratio,0,0);
}

resize();
window.addEventListener("resize",resize);

const track=new Track(canvas);
const player=new Player(track);

let start=Date.now();
let gameOver=false;
let paused=false;

/* ================= MUSICA ARCADE ================= */
const music=new Audio("../music/music.mp3");
music.loop=true;
music.volume=0.4;

let musicStarted=false;

function tryStartMusic(){
    if(musicStarted) return;
    musicStarted=true;
    music.play().catch(()=>{});
}

/* pausa no P */
document.addEventListener("keydown",(e)=>{
    if(e.key==="p") paused=!paused;
});

/* ================= FIM DE JOGO ================= */
function endGame(){

    gameOver=true;

    const time=((Date.now()-start)/1000).toFixed(1);
    const kmh=track.kmh;

    let name=prompt("BATEU! 3 letras:");
    if(!name) name="???";
    name=name.substring(0,3).toUpperCase();

    const old=JSON.parse(localStorage.getItem("f1record"));

    if(!old || kmh>old.kmh){
        localStorage.setItem("f1record",JSON.stringify({
            name,
            time,
            kmh
        }));
    }

    location.reload();
}

/* ================= UPDATE ================= */
function update(){

    if(gameOver||paused) return;

    player.update(input);

    /* qualquer controle inicia a musica */
    if(input.left || input.right || input.touch)
        tryStartMusic();

    track.update(player);

    if(player.crashed)
        endGame();
}

/* ================= RENDER ================= */
function render(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawTrack(ctx,track);
    drawEnemies(ctx,track);
    drawCar(ctx,player);

    const time=((Date.now()-start)/1000).toFixed(1);
    const rec=JSON.parse(localStorage.getItem("f1record"));

    drawHUD(ctx,time,track.kmh,rec);

    if(paused){
        ctx.fillStyle="white";
        ctx.font="20px monospace";
        ctx.fillText("PAUSADO",canvas.width/2-45,canvas.height/2);
    }
}

/* ================= LOOP ================= */
import {resetInput} from "./input.js";

function loop(){
    update();
    render();
    resetInput();   // <-- ESSENCIAL
    requestAnimationFrame(loop);
}
