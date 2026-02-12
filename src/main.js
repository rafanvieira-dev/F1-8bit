import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawHUD} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const player=new Player();
const track=new Track(canvas);

let start=Date.now();
let gameOver=false;
let paused=false;

/* ========= MUSICA ========= */
const music=new Audio("../music/music.mp3");
music.loop=true;
music.volume=0.4;

function startMusic(){
    music.play().catch(()=>{});
}

document.addEventListener("keydown",startMusic,{once:true});
document.addEventListener("touchstart",startMusic,{once:true});

/* ========= PAUSA ========= */
document.addEventListener("keydown",(e)=>{
    if(e.key==="p") paused=!paused;
});

/* ========= COLISAO ========= */
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

    const time=((Date.now()-start)/1000).toFixed(1);

    let name=prompt("BATEU! 3 letras:");
    if(!name) name="???";
    name=name.substring(0,3).toUpperCase();

    const old=JSON.parse(localStorage.getItem("f1record"));

    if(!old || track.speed>old.speed){
        localStorage.setItem("f1record",JSON.stringify({
            name,
            time,
            speed:Number(track.speed.toFixed(1))
        }));
    }

    location.reload();
}

function update(){
    if(gameOver||paused) return;

    player.update(input);
    track.update();

    if(checkCollision()) endGame();
}

function render(){
    ctx.clearRect(0,0,480,640);

    drawTrack(ctx,track);
    drawEnemies(ctx,track);
    drawCar(ctx,player);

    const time=((Date.now()-start)/1000).toFixed(1);
    const rec=JSON.parse(localStorage.getItem("f1record"));

    drawHUD(ctx,time,track.speed.toFixed(1),rec);

    if(paused){
        ctx.fillStyle="white";
        ctx.font="20px monospace";
        ctx.fillText("PAUSADO",190,320);
    }
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
