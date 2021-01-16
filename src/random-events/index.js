import img from '../images/shield.png';
const shieldImage = new Image();
shieldImage.src = img;

import img2 from '../images/timer.png';
const timerImg = new Image();
timerImg.src = img2;

export class Event{

    constructor (){
        this.x = 100;
        this.y = 100;

        this.width = 30;
        this.height = 30;
        
        this.allImages = [shieldImage, timerImg];
        this.image = undefined;
        this.show = false;

        this.shieldActive = false;
        this.timerActive = false;
    }

    pickImage(){
        this.show = true;
        
        const index = Math.floor(Math.random()*this.allImages.length);
        this.image = this.allImages[index];

        if (index == 0){
            this.shieldActive = true;
            this.timerActive = false;
        }
        else if (index == 1){
            this.timerActive = true;
            this.shieldActive = false;
        }
    }

    pickPosition(brick, canvasHeight, canvasWidth){

        let x = undefined;
        let y = undefined;

        do {
            x = Math.floor(Math.random()*600 + 2);
            y = Math.floor(Math.random()*600 + 2);
        } while (!this.checkFreeSpace(x, y, brick));

        this.x = x;
        this.y = y;
    }

    checkFreeSpace(x, y, brick, canvasHeight, canvasWidth){

        for (let i = 0; i < brick.length; i++){
            const b = brick[i];
            if (x + 30 >= b.x &&     // r1 right edge past r2 left
                x <= b.x + b.width &&        // r1 left edge past r2 right
                y + 30 >= b.y &&    // r1 top edge past r2 bottom
                y <= b.y + b.height) {       // r1 bottom edge past r2 top
                    return false;
            }
        }
        if (this.x < 0 || this.y < 0 || this.x + this.width > canvasWidth || this.y + this.height > canvasHeight) return false;
        return true;
    }
    draw(ctx){
        if (this.show){
            ctx.beginPath();
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}