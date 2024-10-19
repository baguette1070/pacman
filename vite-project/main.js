import {Engine, Render, Runner, World, Bodies, Event, Body, Events} from "matter-js";
import {Pacman, } from "./public/pacman.js";

let pacman = new Pacman(165, 135    , 15);

const engine = Engine.create();
engine.world.gravity.y = 0;
engine.world.gravity.x = 0;

const world = engine.world;
const render = Render.create({
    engine: engine,
    element: document.body,
    options: {
        wireframes: false,
        width: 840,
        background: "#3295a8",
        height: 920
    },
});

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 9, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

];
const cellSize = 30;
const tabWall = [];


function drawMap() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const x = j * cellSize + cellSize / 2;
            const y = i * cellSize + cellSize / 2;
            if (map[i][j] === 1) {
                const wall = Bodies.rectangle(x, y, cellSize, cellSize, {
                    isStatic: true,
                    label: 'wall',
                    render: {
                        fillStyle: "#2d4e75"
                    },
                    friction:0,
                });
                World.add(world, wall);
                tabWall.push(wall)
            }
        }
    }
}

drawMap();

pacman.movePacman();


tabWall.forEach((wall) => {
    console.log(wall.height)
    if(pacman.player.position.y - pacman.radius + pacman.player.velocity.y <= wall.position.y + 30 &&
        pacman.player.position.x  + pacman.radius  + pacman.player.velocity.x >= wall.position.x &&
        pacman.player.position.y + pacman.radius  + pacman.player.velocity.y >= wall.position.y &&
        pacman.player.position.x - pacman.radius + pacman.player.velocity.x <= wall.position.x + 30
    ){
        pacman.player.velocity.x = 0
        pacman.player.velocity.y = 0
        console.log("colision")
    }
})
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {

    })
});


World.add(world, [pacman.player]);
Render.run(render);
Runner.run(Runner.create(), engine);



