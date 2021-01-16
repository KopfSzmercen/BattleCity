export class SmallBlast{
    constructor(b){
        this.elementsArr = this.createElements(b);
    }
    draw(ctx){
        this.elementsArr.forEach((e, index) => {
            if(e.radius <= .1) this.elementsArr.splice(index, this.elementsArr.length);
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
            e.radius -= .006;
        });
    }

    createElements(b){
        let ySpeed = 0;
        let xSpeed = -0.009;
        let color = '';
        const radius = 5;
        const changeVal = .0009;
        const elementsArray = [];

        for (let i = 0; i <= 18; i++){

            if(i % 2 === 0) color = '#FF0000';
            else color = '#FFD800';

            const obj = {
                x: b.x + Math.random() * 5,
                y: b.y + Math.random() * 5,
                radius: radius,
                color: color,
                ySpeed: ySpeed,
                xSpeed: xSpeed
            }

            elementsArray.push(obj);

            if(i <= 9) ySpeed -= changeVal;
            else ySpeed += changeVal;
            xSpeed += changeVal;
        }

        ySpeed = 0;
        xSpeed = 0.009;
        for (let i = 0; i <= 18; i++){

            if(i % 2 === 0) color = '#FF0000';
            else color = '#FFD800';

            const obj = {
                x: b.x + Math.random() * 5,
                y: b.y + Math.random() * 5,
                radius: radius,
                color: color,
                ySpeed: ySpeed,
                xSpeed: xSpeed
            }

            elementsArray.push(obj);

            if(i <= 9) ySpeed += changeVal;
            else ySpeed -= changeVal;
            xSpeed -= changeVal;
        }
    
        return elementsArray;
    }
}