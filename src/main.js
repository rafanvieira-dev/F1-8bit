import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack, drawCar, drawCockpit} from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = new Player();
const track = new Track();

let score = 0;
let speed = 0;
let startTime = Date.now();
let gameOver=false;

function update(){

    if(gameOver) return;

    player.update(input);
    track.update();

    speed += 0.002;
    score++;
}

function endGame(){

    gameOver=true;

    const time=((Date.now()-startTime)/1000).toFixed(1);

    let name=prompt("NOVO RECORDE!\nDigite 3 letras:");
    if(!name) name="???";
    name=name.substring(0,3).toUpperCase();

    localStorage.setItem("f1record",
        JSON.stringify({name,time,speed:speed.toFixed(2)})
    );

    location.reload();
}

function render(){

    ctx.clearRect(0,0,480,640);

    drawTrack(ctx,track);     // fundo
    drawCar(ctx,player);      // jogador
    drawCockpit(ctx,score);   // HUD por cima
}

const rec=JSON.parse(localStorage.getItem("f1record"));
    if(rec){
        ctx.fillStyle="white";
        ctx.font="12px monospace";
        ctx.fillText(`REC ${rec.name} ${rec.time}s`,10,20);
    }
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();

