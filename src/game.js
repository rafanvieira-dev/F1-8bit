import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {Enemies} from "./enemies.js";
import {drawTrack, drawCar, drawEnemies, drawCockpit} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const player=new Player();
const track=new Track();
const enemies=new Enemies();

let score=0;
let gameOver=false;

function collision(a,b){
    return a.x < b.x+b.w &&
           a.x+a.w > b.x &&
           a.y < b.y+b.h &&
           a.y+a.h > b.y;
}

function update(){
    if(gameOver) return;

    score++;

    player.update(input);
    track.update(score);
    enemies.update(track.speed);

    const playerBox={x:player.x-8,y:player.y-16,w:16,h:32};

    for(let e of enemies.list){
        if(collision(playerBox,e)){
            gameOver=true;
        }
    }
}

function render(){
    ctx.clearRect(0,0,480,640);

    drawTrack(ctx,track);
    drawEnemies(ctx,enemies);
    drawCar(ctx,player);
    drawCockpit(ctx,score,track.speed);

    if(gameOver){
        ctx.fillStyle="red";
        ctx.font="40px monospace";
        ctx.fillText("GAME OVER",120,300);
    }
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
