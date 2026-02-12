import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawCockpit} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

/* corrigir tamanho em qualquer tela */
canvas.width=480;
canvas.height=640;

/* música mobile */
const music=document.getElementById("bgm");
function startMusic(){
    if(music && music.paused){
        music.volume=0.35;
        music.play().catch(()=>{});
    }
}
document.addEventListener("touchstart",startMusic,{once:true});
document.addEventListener("keydown",startMusic,{once:true});

/* objetos */
const player=new Player();
const track=new Track(canvas);

/* score arcade */
let score=0;
let best=Number(localStorage.getItem("f1best")||0);
let gameOver=false;

function endGame(){

    gameOver=true;

    if(score>best){
        best=score;
        localStorage.setItem("f1best",best);
    }

    setTimeout(()=>{
        alert(
`FIM DE CORRIDA

KMH ${track.kmh}
SCORE ${score}
BEST ${best}`
        );
        location.reload();
    },100);
}

function update(){

    if(gameOver) return;

    player.update(input,track);

    const passed=track.update(player);

    /* pontuação estilo arcade */
    score += passed*120 + Math.floor(track.kmh/12);

    if(player.crashed) endGame();
}

function render(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawTrack(ctx,track);
    drawEnemies(ctx,track);
    drawCar(ctx,player);

    drawCockpit(ctx,score,track.kmh,best);
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
