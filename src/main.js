import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawHUD} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

/* RESOLUÇÃO BASE DO JOGO */
const GAME_WIDTH=360;
const GAME_HEIGHT=640;

let scale=1;

function resize(){

    const sw=window.innerWidth;
    const sh=window.innerHeight;

    scale=Math.min(sw/GAME_WIDTH,sh/GAME_HEIGHT);

    canvas.width=GAME_WIDTH;
    canvas.height=GAME_HEIGHT;

    canvas.style.width=(GAME_WIDTH*scale)+"px";
    canvas.style.height=(GAME_HEIGHT*scale)+"px";
}

resize();
window.addEventListener("resize",resize);

const track=new Track(canvas);
const player=new Player(track);

let start=Date.now();
let gameOver=false;

/* LOOP */
function update(){
    if(gameOver) return;

    player.update(input);
    track.update(player);

    if(player.crashed) location.reload();
}

function render(){

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

    drawTrack(ctx,track);
    drawEnemies(ctx,track);
    drawCar(ctx,player);

    const time=((Date.now()-start)/1000).toFixed(1);
    drawHUD(ctx,time,track.kmh,null);
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
