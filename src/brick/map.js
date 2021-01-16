import mapPlan from './maps/map.json';

export function generateMap(){
    const mapCells = mapPlan;

    mapCells.sort((a, b) => {
        return a[0] - b[0];
    });
    return mapCells;
}