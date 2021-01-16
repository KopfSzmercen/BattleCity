import img from '../images/eagle.png';
const eagleImage = new Image();
eagleImage.src = img;

export class Eagle{
    constructor(){
        this.x = 265;
        this.y = 540;
        this.height = 65;
        this.width = 65;
        this.image = eagleImage;

        this.killed = false;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}