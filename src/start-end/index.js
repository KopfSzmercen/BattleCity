export function StartGame(main, eagle) {
    document.querySelector('[data-play]').addEventListener('click', e => {
        document.querySelector('[data-container]').classList.add('hidden');
        setTimeout(main, 1500);
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Enter' && eagle.killed) {
            document.querySelector('[data-container]').classList.add('hidden');
            setTimeout(main, 1500);
        }
    });
}

const overPanel = document.querySelector('[data-over]');
const playAgainBtn = document.querySelector('[data-play-again]');

export function gameOver(eagle, brick, mapPlan, Brick, main, enemies, player, ctx){
    overPanel.classList.remove('hidden');
    playAgainBtn.addEventListener('click', e => {
        brick.array = [];
        mapPlan.forEach(cell => {
            brick.array.push(new Brick(cell[0], cell[1]));
        });
        if (!overPanel.classList.contains('hidden')) setTimeout(main, 1500);
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        overPanel.classList.add('hidden');

        enemies.forEach(e => {
            e.bullets = [];
            e.y = 20;
        });

        player.x = 300;
        player.y = 400;
        player.gunX = player.x + 13;
        player.gunY = player.y - 20;
        player.gunWidth = 4;
        player.gunHeight = 20;


        eagle.killed = false;

    });
}

