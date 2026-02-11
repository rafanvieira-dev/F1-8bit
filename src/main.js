import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack,drawCar,drawEnemies,drawHUD} from "./renderer.js";

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

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
    if(gameOver) return;

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
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();
