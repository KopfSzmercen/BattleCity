import './style.css';

import { StartGame } from './start-end/index';
import { gameOver } from './start-end/index';
import { Player } from './player/player';
import { Brick } from './brick/index';
import { Enemy } from './enemies/enemies';
import { generateMap } from './brick/map';

import { Event } from './random-events/index';
import { Eagle } from './eagle/index';

const canvas = document.querySelector('[data-canvas]');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const player = new Player();
const enemies = [new Enemy(), new Enemy()];
const smallBlasts = [];
const bigBlastsArr = [];
const event = new Event();
const eagle = new Eagle();

const brick = {
    array: []
};
const mapPlan = generateMap();
let main = undefined;

mapPlan.forEach(cell => {
    brick.array.push(new Brick(cell[0], cell[1]));
});


main = function main() {
    
    const request = requestAnimationFrame(main);
    if (!eagle.killed) {
        ctx.clearRect(0, 0, width, height);
        brick.array.forEach(b => b.draw(ctx));

        player.drawBullets(ctx);
        player.checkShooting(brick.array, enemies, smallBlasts, bigBlastsArr);
        if (event.show && !player.eventPicked) player.eventCollision(event);
        if (player.moving) {
            player.checkWalls(width, height);
            player.checkBrickCollision(brick.array);
            player.move();
        }
        player.draw(ctx);

        if (smallBlasts.length !== 0) smallBlasts.forEach((b, index) => {
            b.draw(ctx);
            b.move(ctx);
        });

        if (bigBlastsArr.length !== 0) bigBlastsArr.forEach((b, index) => {
            b.draw(ctx);
            b.move(ctx);
        });


        enemies.forEach(enemy => {
            if (player.timerActive) enemy.speed = 0.3;
            else enemy.speed = 1;
            enemy.move();
            enemy.drawBullets(ctx);
            enemy.checkWalls(width, height);
            enemy.checkBrickCollision(brick.array);
            enemy.checkShooting(brick.array, player, eagle, smallBlasts, bigBlastsArr);
            enemy.draw(ctx);
            player.checkShooting(brick.array, enemy);
        });
        if (!player.eventPicked) event.draw(ctx);
        eagle.draw(ctx);
    }
    else{
        cancelAnimationFrame(request);
        gameOver(eagle, brick, mapPlan, Brick, main, enemies, player, ctx);
        return false;
    }
}


player.startMove(brick.array);
player.shoot();

StartGame(main, eagle);

let timeInterval = 2500;
setInterval(() => {
    timeInterval = Math.floor(Math.random() * 3000 + 1000);
}, 1200);

enemies.forEach(enemy => {
    setInterval(() => {
        enemy.changeDirection();
    }, timeInterval);

    if (!eagle.killed){
        setInterval(() => {
            enemy.shooting();
            enemy.fire();
        }, 800);
    }
});

setInterval(() => {
    event.pickImage();
    event.pickPosition(brick.array, height, width);

    setTimeout(() => {
        player.eventPicked = false;
        event.show = false;
        player.shieldActive = false;
        player.timerActive = false;
        player.color = '#FFAD32';
    }, 8000)
}, 12000);