import { Bullet } from '../player/bullets';
import { SmallBlast, SmallBlasts } from '../blast/small-blast';
import { BigBlast } from '../blast/big-blast';

export class Enemy{
    constructor(){
        this.width = 30;
        this.height = 30;
        this.x = this.getRandomX();
        this.y = 0;
        this.color = '#BBC9DD';
        this.speed = 1;

        this.rightWall = false;
        this.leftWall = false;
        this.upperWall = false;
        this.lowerWall = false;

        this.rightBrickCollision = false;
        this.leftBrickCollision = false;
        this.upBrickCollision = false;
        this.lowerBrickCollision = false;

        this.bullets = [new Bullet(-19)];

        this.gunX = this.x + 13;
        this.gunY = this.y - 20;
        this.gunWidth = 4;
        this.gunHeight = 20;
        this.shoot = false;

        this.lastDir = 'down';
    }

    getRandomX(){
        return Math.floor(Math.random() * 500 + 30);
    }

    draw(ctx) {
        
        //gun
        ctx.fillStyle = this.color;
        ctx.fillRect(this.gunX, this.gunY, this.gunWidth, this.gunHeight);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawBullets(ctx) {
        //Draw and move bullet
        this.bullets.forEach(b => {
            b.draw(ctx);
            b.move();
        });
    }

    shooting(){
        if(!this.shoot)  this.shoot = true;
        else this.shoot = false;
    }

    move(){
        if (!this.upperWall && !this.upBrickCollision && this.lastDir === 'up') {
            this.y -= this.speed;
            this.gunX = this.x + 13;
            this.gunY = this.y - 20;
            this.gunWidth = 4;
            this.gunHeight = 20;
            this.lastDir = 'up';
        }
        else if (!this.lowerWall && !this.lowerBrickCollision && this.lastDir === 'down') {
            this.y += this.speed;
            this.gunX = this.x + 13;
            this.gunY = this.y + 30;
            this.gunWidth = 4;
            this.gunHeight = 20;
            this.lastDir = 'down';
        }

        else if (!this.rightWall && !this.rightBrickCollision  && this.lastDir === 'right') {
            this.x += this.speed;
            this.gunX = this.x + 30;
            this.gunY = this.y + 13;
            this.gunWidth = 20;
            this.gunHeight = 4;
            this.lastDir = 'right';
        }
        else if (!this.leftWall && !this.leftBrickCollision  && this.lastDir === 'left') {
            this.x -= this.speed;
            this.gunX = this.x - 20;
            this.gunY = this.y + 13;
            this.gunWidth = 20;
            this.gunHeight = 4;
            this.lastDir = 'left';
        }
    }

    changeDirection(){
        const directions = ['down', 'up', 'left', 'left','right','right','down', 'down','down','down'];
        const index = Math.floor(Math.random()* directions.length);
        this.lastDir = directions[index];
    }

    fire(){
        //SHOOTING
        if (this.shoot && this.lastDir) {
            const bullet = new Bullet(this.x + 15, this.y, this.lastDir);
            bullet.getProperPosition();
            this.bullets.push(bullet);
        }
    }

    checkWalls(width,height){
        if (this.x + this.width + this.gunWidth> width - .5) {
            this.rightWall = true;
            this.lastDir = 'left';
        } else {
            this.rightWall = false;
        }
        if (this.x < .5 + this.gunWidth) {
            this.leftWall = true;
            this.lastDir = 'right';
        }
        else{
            this.leftWall = false;
        }

        if(this.y + this.height + this.gunHeight > height - .5){
            this.lowerWall = true;
            this.lastDir = 'up';
        }
        else{
            this.lowerWall = false;
        }

        if(this.y < .5 + this.gunHeight){
            this.upperWall = true;
            this.lastDir = 'down';
        }
        else{
            this.upperWall = false;
        }
    }

    checkBrickCollision(brick){

        for(let i = 0; i < brick.length; i++){
            const b = brick[i];
             //brick to the right side
             if (this.x + this.width + this.gunWidth > b.x - 2 && (this.y < b.y + 10 && this.y > b.y - this.height) && (this.x < b.x - this.width)){
                this.rightBrickCollision = true;
                const possibleDir = ['left', 'down', 'up'];
                this.x -= 2;
                this.lastDir = possibleDir[Math.floor(Math.random()*2)];
             } 
             if (this.lastDir === 'left' || this.lastDir === 'up' || this.lastDir === 'down' && this.rightBrickCollision === true) this.rightBrickCollision = false;
 
 
             //brick to the left side
             if (this.x < b.x - 10 + this.width + this.gunWidth && (this.y < b.y + 10 && this.y > b.y - this.height) && (this.x + this.width > b.x)){
                this.leftBrickCollision = true;
                const possibleDir = ['right', 'down', 'up'];
                this.x += 2;
                this.lastDir = possibleDir[Math.floor(Math.random()*2)];
             }
             if (this.lastDir === 'right' || this.lastDir === 'up' || this.lastDir === 'down' && this.leftBrickCollision === true) this.leftBrickCollision = false;
 
             //upper brick
             if(this.y - this.height < b.y + 8 && (this.y - b.y > b.y - this.y) && ((this.x + this.width > b.x && this.x - b.x < 8) ||(this.x > b.x && this.x < b.x + 12))){
                this.upBrickCollision = true;
                const possibleDir = ['right', 'left', 'down'];
                this.y += 2;
                this.lastDir = possibleDir[Math.floor(Math.random()*2)];
             }  
             if (this.lastDir === 'right' || this.lastDir === 'left' || this.lastDir === 'down' && this.upBrickCollision === true) this.upBrickCollision = false;
 
             //lower wall
             if(this.y + this.height + this.gunHeight> b.y  && (this.y - b.y < b.y - this.y)&& ((this.x + this.width> b.x && this.x - b.x < 8)|| (this.x > b.x && this.x < b.x + 12))){
                this.lowerBrickCollision = true;
                const possibleDir = ['right', 'left', 'up'];
                this.y -= 2;
                this.lastDir = possibleDir[Math.floor(Math.random()*2)];
             }
             if (this.lastDir === 'right' || this.lastDir === 'left' || this.lastDir === 'up' && this.lowerBrickCollision === true) this.lowerBrickCollision = false;

             if(this.lowerBrickCollision && this.upBrickCollision) this.lastDir = 'left';
             if(this.leftBrickCollision && this.upBrickCollision) this.lastDir = 'down';
        };
    }

    checkShooting(bricks, player, eagle, smallBlasts, bigBlastsArr){
        this.bullets.forEach( (bullet, bulletIndex, smallBlasts) => {
            bricks.forEach( (brick, brickIndex) => {
                if((bullet.x > brick.x - 2 && bullet.x < brick.x + 14) && (bullet.y > brick.y - 2 && bullet.y < brick.y + 14)){
                    smallBlasts.push(new SmallBlast(brick));
                    bricks.splice(brickIndex,1);
                    this.bullets.splice(bulletIndex,1);
                }
            });

            if((bullet.x > player.x && bullet.x < player.x + this.width) && (bullet.y > player.y && bullet.y < player.y + this.height) ||
                (bullet.x > player.gunX && bullet.x < player.gunX + player.gunWidth) && (bullet.y > player.gunY && bullet.y < player.gunY + player.gunHeight)){
                    this.bullets.splice(bulletIndex,1);

                    if (!player.shieldActive){
                        bigBlastsArr.push(new BigBlast(bullet));
                        player.x = 300;
                        player.y = 400;
                        player.gunX = player.x + 13;
                        player.gunY = player.y - 20;
                        player.gunWidth = 4;
                        player.gunHeight = 20;
                        player.lastDir = 'up';
                }
            };

            if((bullet.x > eagle.x && bullet.x < eagle.x + eagle.width) && (bullet.y > eagle.y && bullet.y < eagle.y + eagle.height)){
                eagle.killed = true;
            }
        });
    }
}