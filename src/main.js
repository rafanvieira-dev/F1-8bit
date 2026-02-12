import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawHUD} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

/* resolução lógica maior (pista mais larga) */
const GAME_WIDTH=600;
const GAME_HEIGHT=800;

/* canvas adaptável */
function resize(){
    const scale=Math.min(
        window.innerWidth/GAME_WIDTH,
        window.innerHeight/GAME_HEIGHT
    );

    canvas.width=GAME_WIDTH;
    canvas.height=GAME_HEIGHT;

    canvas.style.width=(GAME_WIDTH*scale)+"px";
    canvas.style.height=(GAME_HEIGHT*scale)+"px";
}
window.addEventListener("resize",resize);
resize();

/* música */
const music=new Audio("../music/music.mp3");
music.loop=true;
music.volume=0.4;
music.play().catch(()=>{});

/* pausa */
let paused=false;
document.addEventListener("keydown",e=>{
    if(e.key.toLowerCase()==="p") togglePause();
});

const pauseBtn=document.createElement("button");
pauseBtn.id="pauseBtn";
pauseBtn.innerText="⏸";
document.body.appendChild(pauseBtn);
pauseBtn.onclick=togglePause;

function togglePause(){
    paused=!paused;
    pauseBtn.innerText=paused?"▶":"⏸";
}

/* jogo */
const player=new Player();
const track=new Track();

let start=Date.now();
let gameOver=false;

function checkCollision(){
    for(const e of track.enemies){
        if(Math.abs(e.x-player.x)<20 &&
           Math.abs(e.y-player.y)<25){
            return true;
        }
    }
    return false;
}

function endGame(){
    gameOver=true;
    music.pause();

    const time=((Date.now()-start)/1000).toFixed(1);

    let name=prompt("BATEU! 3 letras:");
    if(!name) name="???";
    name=name.substring(0,3).toUpperCase();

    localStorage.setItem("f1record",JSON.stringify({
        name,time,speed:track.speed.toFixed(1)
    }));

    location.reload();
}

function update(){
    if(gameOver||paused) return;

    player.update(input);
    track.update();

    if(checkCollision()) endGame();
}

function render(){
    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    drawTrack(ctx,track);
    drawEnemies(ctx,track);
    drawCar(ctx,player);

    const time=((Date.now()-start)/1000).toFixed(1);
    const rec=JSON.parse(localStorage.getItem("f1record"));

    drawHUD(ctx,time,track.speed.toFixed(1),rec);

    if(paused){
        ctx.fillStyle="rgba(0,0,0,0.5)";
        ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);

        ctx.fillStyle="white";
        ctx.font="bold 60px Arial";
        ctx.textAlign="center";
        ctx.fillText("PAUSADO",GAME_WIDTH/2,GAME_HEIGHT/2);
    }
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
