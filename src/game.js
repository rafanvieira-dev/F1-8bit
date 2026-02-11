import {input} from "./input.js";
import {Player} from "./player.js";
import {Track} from "./track.js";
import {drawTrack, drawCar, drawCockpit} from "./renderer.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = new Player();
const track = new Track();

let score = 0;

function update(){
    player.update(input);
    track.update();
    score++;
}

function render(){
    ctx.clearRect(0,0,480,640);

    drawTrack(ctx,track);
    drawCar(ctx,player);
    drawCockpit(ctx,score);
}

function loop(){
    update();
    render();
    requestAnimationFrame(loop);
}

loop();

