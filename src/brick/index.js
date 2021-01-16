export class Brick{
    constructor(x,y){
        this.width = 10;
        this.height = 10;

        this.x = x;
        this.y = y;

        this.color = '#dc5539';
        this.frameColor = '#808285';
    }

    draw(ctx) {
        ctx.save();
        ctx.lineWidth = ".5";
        ctx.strokeStyle = this.frameColor;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.rect(this.x, this.y, this.width + 2, this.height + 2);
        ctx.stroke();
        ctx.restore();
    }
}