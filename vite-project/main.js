import {Engine, Render, Runner, World, Bodies, Events} from "matter-js";
import {Pacman, } from "./public/pacman.js";
import {Coins, } from "./public/coins.js"
import {CheckCollision} from "./public/checkColiision.js";

let pacman = new Pacman(60, 45, 10, 18, 1, {
    label: "pacmanBox"
});
let col = new CheckCollision()

const engine = Engine.create();
engine.gravity.y = 0
const world = engine.world;
const render = Render.create({
    engine: engine,
    element: document.body,
    options: {
        wireframes: false,
        width: 840,
        background: "white",
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
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const cellSize = 30;
const tabCoins = []; // Pour stocker toutes les pièces
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
                    }
                });
                World.add(world, wall);
                tabWall.push(wall)
            }
            if (map[i][j] === 2) {
                const coins = new Coins(x, y, 5, 10, {
                    label: "coins"
                });
                const bg_sol = Bodies.rectangle(x, y, cellSize, cellSize, {
                    label: "sol",
                    collisionFilter:{
                        'group': -1,
                        'category': 2,
                        'mask': 0,
                    },
                    render: {
                        fillStyle: "#3295a8"
                    },
                    isStatic: true
                });
                World.add(world, [bg_sol, coins.coins]);
                tabCoins.push(coins); // Ajouter les pièces à la liste
            }
            if (map[i][j] === 9) {
                const bg_sol = Bodies.rectangle(x, y, cellSize, cellSize, {
                    label: "sol",
                    render: {
                        fillStyle: "#3295a8"
                    },
                    isStatic: true
                });
                World.add(world, bg_sol);
            }
        }
    }
}

drawMap();
pacman.movePacman(engine, tabWall);
col.checkCollisionPiece(engine, tabCoins, world)
col.checkCollisionWall(engine, tabWall, world, pacman)

World.add(world, [pacman.player]);
Render.run(render);
Runner.run(Runner.create(), engine);


