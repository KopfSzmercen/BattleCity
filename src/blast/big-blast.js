export class BigBlast{
    constructor(b){
        this.elementsArr = this.createElements(b);
    }

    draw(ctx){
        this.elementsArr.forEach((e, index) => {
            if(e.radius <= 0.05) this.elementsArr.splice(index, this.elementsArr.length);
            ctx.beginPath();
            ctx.fillStyle = e.color;
            ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            this.move();
        });
    }

    move(){
        this.elementsArr.forEach( e => {
            e.x += e.xSpeed;
            e.y += e.ySpeed;
            e.radius -= .005;
        });
    }

    createElements(b){
        const elementsArr = [];
        let xSpeed = -0.007;
        let ySpeed = 0;
        let radius = 10;

        for (let i = 0; i < 30; i++){
            let color = undefined;
            if(i % 2 === 0) color = '#FF0000';
            else color = '#FFD800';
            const obj = {
                x: b.x + Math.random() * 8 - 8,
                y: b.y + Math.random() * 8 - 8,
                radius: radius,
                color: color,
                xSpeed: xSpeed + Math.random()* .002,
                ySpeed: ySpeed + Math.random()* .002,
            }
            xSpeed += .0005;
            if(i <= 15) ySpeed -= .0005;
            else ySpeed += .0005;
            elementsArr.push(obj);
        }


        xSpeed = 0.007;
        ySpeed = 0;
        for (let i = 0; i < 30; i++){
            let color = undefined;
            if(i % 2 === 0) color = '#FF0000';
            else color = '#FFD800';

            const obj = {
                x: b.x + Math.random() * 8 - 8,
                y: b.y + Math.random() * 8 - 8,
                radius: radius,
                color: color,
                xSpeed: xSpeed + Math.random()* .002,
                ySpeed: ySpeed + Math.random()* .002
            }
            xSpeed -= .0005;
            if(i <= 15) ySpeed += .0005;
            else ySpeed -= .0005;
            elementsArr.push(obj);
        }

        return elementsArr;
    }
}