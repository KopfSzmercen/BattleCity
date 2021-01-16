import { Bullet } from './bullets';
import { SmallBlast } from '../blast/small-blast';
import { BigBlast } from '../blast/big-blast';

export class Player {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = 300;
        this.y = 400;
        this.color = '#FFAD32';
        this.speed = 1.5;

        this.rightWall = false;
        this.leftWall = false;
        this.upperWall = false;
        this.lowerWall = false;

        
        this.collision = false;
        this.collisionSide = undefined;

        this.bullets = [new Bullet(-19)];

        this.gunX = this.x + 13;
        this.gunY = this.y - 20;
        this.gunWidth = 4;
        this.gunHeight = 20;

        this.lastKey = undefined;
        this.moving = false;

        this.possibleCollisionRight = false;
        this.possibleCollisionLeft = false;
        this.possibleCollisionUp = false;
        this.possibleCollisionDown = false;

        this.eventPicked = false;

        this.shieldActive = false;
        this.timerActive = false;

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //gun
        ctx.fillRect(this.gunX, this.gunY, this.gunWidth, this.gunHeight);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    drawBullets(ctx) {
        //Draw and move bullet
        this.bullets.forEach(b => {
            ctx.beginPath();
            b.color = this.color;
            b.draw(ctx);
            b.move();
        });
    }

    startMove(brick) {
        window.addEventListener('keydown', e => {
            if (e.key === 'ArrowUp' && !this.upperWall && !this.upBrickCollision) {
                
                this.checkPossibleCollision(brick, 'up');
                if (!this.possibleCollisionUp) {
                    this.lastKey = 'up';
                    this.moving = true;
                }
            }
            else if (e.key === 'ArrowDown' && !this.lowerWall && !this.lowerBrickCollision) {
                
                this.checkPossibleCollision(brick, 'down');
                if (!this.possibleCollisionDown) {
                    this.moving = true;
                    this.lastKey = 'down';
                    this.upperWall = false;
                };
            }

            else if (e.key === 'ArrowRight' && !this.rightWall && !this.rightBrickCollision) {

                this.checkPossibleCollision(brick, 'right');
                if (!this.possibleCollisionRight) {
                    this.moving = true;
                    this.lastKey = 'right';
                }
            }
            else if (e.key === 'ArrowLeft' && !this.leftWall && !this.leftBrickCollision) {

                this.checkPossibleCollision(brick, 'left');
                if (!this.possibleCollisionLeft) {
                    this.moving = true;
                    this.lastKey = 'left';
                }
            }
        });

        window.addEventListener('keyup', e => {
            this.moving = false;
            this.timeStamp = undefined;
        });
    }
    shoot() {

        window.addEventListener('keydown', e => {
            if (e.key === ' ' && this.lastKey) {
                const bullet = new Bullet(this.x + 15, this.y, this.lastKey);
                bullet.getProperPosition();
                this.bullets.push(bullet);
            }
        });
    }
    move() {
        if (this.collision) return;

        if (this.lastKey === 'up') {
            this.y -= this.speed;
            this.gunX = this.x + 13;
            this.gunY = this.y - 20;
            this.gunWidth = 4;
            this.gunHeight = 20;
            this.lastKey = 'up';
        }

        else if (this.lastKey === 'down') {
            this.y += this.speed;
            this.gunX = this.x + 13;
            this.gunY = this.y + 30;
            this.gunWidth = 4;
            this.gunHeight = 20;
            this.lastKey = 'down';
        }

        else if (this.lastKey === 'right') {
            this.x += this.speed;
            this.gunX = this.x + 30;
            this.gunY = this.y + 13;
            this.gunWidth = 20;
            this.gunHeight = 4;
            this.lastKey = 'right';
        }

        else if (this.lastKey === 'left') {
            this.x -= this.speed;
            this.gunX = this.x - 20;
            this.gunY = this.y + 13;
            this.gunWidth = 20;
            this.gunHeight = 4;
            this.lastKey = 'left';
        }


    }
    checkWalls(width, height) {
        if (this.x + this.width + this.gunWidth > width - .5) {
            this.rightWall = true;
            this.moving = false;
        } else {
            this.rightWall = false;
        } if ((this.lastKey === 'left' || this.lastKey === 'down' || this.lastKey === 'up') && this.rightWall) this.moving = true;

        if (this.x < .5 + this.gunWidth) {
            this.leftWall = true;
            this.moving = false;
        }
        else {
            this.leftWall = false;
        } if ((this.lastKey === 'right' || this.lastKey === 'down' || this.lastKey === 'up') && this.leftWall) this.moving = true;

        if (this.y + this.height + this.gunHeight > height - .5) {
            this.lowerWall = true;
            this.moving = false;
        }
        else {
            this.lowerWall = false;
        } if ((this.lastKey === 'right' || this.lastKey === 'left' || this.lastKey === 'up') && this.lowerWall) this.moving = true;

        if (this.y < .5 + this.gunHeight) {
            this.upperWall = true;
            this.moving = false;
        }
        else {
            this.upperWall = false;
        } if ((this.lastKey === 'right' || this.lastKey === 'left' || this.lastKey === 'down') && this.upperWall) this.moving = true;
    }

    checkBrickCollision(brick) {
        if (this.lastKey === this.collisionSide) return;
        else if (this.lastKey !== this.collisionSide && this.collisionSide !== undefined){
            this.collision = false;
            this.collisionSide = undefined;
            return;
        }
        for (let i = 0; i < brick.length; i++) {
            const b = brick[i];
            //brick to the right side
            if (this.x + this.width >= b.x &&     // r1 right edge past r2 left
                this.x <= b.x + b.width &&        // r1 left edge past r2 right
                this.y + this.height >= b.y &&    // r1 top edge past r2 bottom
                this.y <= b.y + b.height) {       // r1 bottom edge past r2 top
                    this.collision = true;
                    this.collisionSide = this.lastKey;
            }
            if (this.gunX + this.gunWidth >= b.x &&     // r1 right edge past r2 left
                this.gunX <= b.x + b.width &&        // r1 left edge past r2 right
                this.gunY + this.gunHeight >= b.y &&    // r1 top edge past r2 bottom
                this.gunY <= b.y + b.height) {    
                    this.collision = true;   // r1 bottom edge past r2 top
                    this.collisionSide = this.lastKey;
            }
        };
    }

    checkPossibleCollision(brick, side){
        const tempPlayer = {
            x : this.x,
            y : this.y,
            gunHeight : this.gunHeight,
            gunWidth : this.gunWidth,
            gunX : this.gunX,
            gunY : this.gunY
        };

        if (side === 'up'){
            tempPlayer.gunX = this.x + 13;
            tempPlayer.gunY = this.y - 20;
            tempPlayer.gunWidth = 4;
            tempPlayer.gunHeight = 20;
            
            if (this.possibleCollisionDetect(tempPlayer, brick)){
                this.possibleCollisionUp = true;
                this.moving = false;
            }
            else this.possibleCollisionUp = false;
        }
        else if (side === 'down'){
            tempPlayer.gunX = this.x + 13;
            tempPlayer.gunY = this.y + 30;
            tempPlayer.gunWidth = 4;
            tempPlayer.gunHeight = 20;
            
            if (this.possibleCollisionDetect(tempPlayer, brick)){
                this.possibleCollisionDown = true;
                this.moving = false;
            }
            else this.possibleCollisionDown = false;
        }
        else if (side === 'left'){
            tempPlayer.gunX = this.x - 20;
            tempPlayer.gunY = this.y + 13;
            tempPlayer.gunWidth = 20;
            tempPlayer.gunHeight = 4;
            
            if (this.possibleCollisionDetect(tempPlayer, brick)){
                this.possibleCollisionLeft = true;
                this.moving = false;
            }
            else this.possibleCollisionLeft = false;
        }

        else if (side === 'right'){
            tempPlayer.gunX = this.x + 30;
            tempPlayer.gunY = this.y + 13;
            tempPlayer.gunWidth = 20;
            tempPlayer.gunHeight = 4;
            
            if (this.possibleCollisionDetect(tempPlayer, brick)){
                this.possibleCollisionRight = true;
                this.moving = false;
            }
            else this.possibleCollisionRight = false;
        }
    }

    possibleCollisionDetect(tempPlayer, brick){
        for (let i = 0; i < brick.length; i++){
            const b = brick[i];
            if (tempPlayer.gunX + tempPlayer.gunWidth >= b.x &&
                tempPlayer.gunX <= b.x + b.width &&        
                tempPlayer.gunY + tempPlayer.gunHeight >= b.y &&    
                tempPlayer.gunY <= b.y + b.height) {    
                    return true;
            }
        }
        return false;
    }

    checkShooting(bricks, enemy, smallBlasts, bigBlastsArr) {
        this.bullets.forEach((bullet, bulletIndex, bigBlastsArr) => {
            bricks.forEach((brick, brickIndex, bigBlastsArr) => {
                if ((bullet.x > brick.x - 2 && bullet.x < brick.x + 14) && (bullet.y > brick.y - 2 && bullet.y < brick.y + 14)) {
                    smallBlasts.push(new SmallBlast(brick));
                    bricks.splice(brickIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                }
                if ((bullet.x > enemy.x && bullet.x < enemy.x + this.width) && (bullet.y > enemy.y && bullet.y < enemy.y + this.height) ||
                    (bullet.x > enemy.gunX && bullet.x < enemy.gunX + enemy.gunWidth) && (bullet.y > enemy.gunY && bullet.y < enemy.gunY + enemy.gunHeight)) {
                    bigBlastsArr.push(new BigBlast(bullet));
                    this.bullets.splice(bulletIndex, 1);
                    enemy.x = Math.floor(Math.random() * 100);
                    enemy.y = 60;
                    enemy.lastDir = 'down';
                    enemy.gunX = enemy.x + 13;
                    enemy.gunY = enemy.y + enemy.height;
                    enemy.gunWidth = 4;
                    enemy.gunHeight = 20;
                    enemy.rightBrickCollision = false;
                    enemy.leftBrickCollision = false;
                    enemy.upBrickCollision = false;
                    enemy.lowerBrickCollision = false;
                }
            });
            if (bullet.x > 720 || bullet.y > 720 || bullet.x < - 80 || bullet.y < - 80) this.bullets.splice(bulletIndex, 1);
        });
    }

    eventCollision(event){
        if (this.x + this.width >= event.x &&     
            this.x <= event.x + event.width &&
            this.y + this.height >= event.y &&    
            this.y <= event.y + event.height) {       
               this.eventPicked = true;
               if (event.shieldActive){
                    this.shieldActive = true;
                    this.color = '#41B619';
               } else {
                   this.timerActive = true;
               }
        }
    }
}