window.onload = addCells;

let array = [];

function addCells(){
    const container = document.querySelector('[data-container]');
    for(let i = 0; i < 2500; i++){
        let div = document.createElement('div');
        div.classList.add('cell');
        div.id = i;
        container.insertAdjacentElement('beforeend', div);

        if (i >= 2171 && i <= 2178) div.classList.add('picked');
        else if (i >= 2221 && i <= 2228) div.classList.add('picked');
        else if (i >= 2271 && i <= 2278) div.classList.add('picked');
        else if (i >= 2321 && i <= 2328) div.classList.add('picked');
        else if (i >= 2371 && i <= 2378) div.classList.add('picked');
        else if (i >= 2421 && i <= 2428) div.classList.add('picked');
        else if (i >= 2471 && i <= 2478) div.classList.add('picked');
    }
    getElements();
}
function setup(){
    createCanvas(0 ,0);
}

function getElements() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell,i)=> {
        cell.addEventListener('click', e => {

            if (i >= 2171 && i <= 2178) return;
            else if (i >= 2221 && i <= 2228) return;
            else if (i >= 2271 && i <= 2278) return;
            else if (i >= 2321 && i <= 2328) return;
            else if (i >= 2371 && i <= 2378) return;
            else if (i >= 2421 && i <= 2428) return;
            else if (i >= 2471 && i <= 2478) return;

            cell.classList.toggle('picked');
            if(cell.classList.contains('picked')) addToArray(cell.id);
            else removeFromArray(cell);
        });
    });
}

function addToArray(id){
    let x = id % 50;
    x *= 12;
    let y = Math.floor(id / 50);
    y *= 12;

    let cell = [x, y];
    array.push(cell);
}

function removeFromArray(cell){
    array.forEach((e, index) => {
        let x = cell.id % 50;
        x *= 12;
        let y = Math.floor(cell.id / 50);
        y *= 12;

        if(x === e[0] && y === e[1]) array.splice(index, 1);
    })
}

document.getElementById('btn').addEventListener('click', e => {
    const input = document.querySelector('[data-input]');

    if(input.value === '' || input.value === '') return;
    else saveJSON(array, `${input.value}`);
});