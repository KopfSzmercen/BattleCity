export class Bullet{
    constructor(x,y,direction){
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.direction = direction;
        this.speed = 4;
        this.color = '#BBC9DD';
    }

    getProperPosition(){
        if(this.direction === 'down'){
            this.y += 30;
        }
        else if(this.direction === 'right'){
            this.x += 15;
            this.y += 15;
        }
        else if(this.direction === 'left'){
            this.x -= 15;
            this.y += 15;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move(){
        if(this.direction === 'right'){
            this.x += this.speed;
        }
        else if(this.direction === 'left'){
            this.x -= this.speed;
        }
        else if(this.direction === 'up'){
            this.y -= this.speed;
        }
        else if(this.direction === 'down'){
            this.y += this.speed;
        }
    }
}