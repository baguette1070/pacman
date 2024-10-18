import { Engine, Bodies, World, Body } from 'matter-js';
import {CheckCollision} from "./checkColiision.js";

export class Pacman {

    constructor(positionXPacman, positionYPacman, width, height, speed) {
        this.positionXPacman = positionXPacman
        this.positionYPacman = positionYPacman
        this.width = width
        this.height = height
        this.speed = speed

        this.player = Bodies.circle(this.positionXPacman, this.positionYPacman, this.width, {
            label:"pacmanBox",
            isStatic:false,
            restitution: 0,
            render:{
                fillStyle   :"yellow",
                strokeStyle:"black",

            }
        })
    }


    movePacman(engine, tabWall) {
        let interval = null;
        const col = new CheckCollision();
        console.log(col.checkCollisionWall(engine, tabWall, this.player))

        window.onkeydown = (event) => {
            if (interval) return;  // Prevent multiple intervals from being created.

            interval = setInterval(() => {
                let nextPosition = { x: this.positionXPacman, y: this.positionYPacman };
                switch (event.key) {
                    case 'd':
                        nextPosition.x += this.speed;
                        break;
                    case 'q':
                        nextPosition.x -= this.speed;
                        break;
                    case 'z':
                        nextPosition.y -= this.speed;
                        break;
                    case 's':
                        nextPosition.y += this.speed;
                        break;
                }

                Body.setPosition(this.player, nextPosition);
                    this.positionXPacman = nextPosition.x;
                    this.positionYPacman = nextPosition.y;
            }, 5);
        };

        window.onkeyup = () => {
            clearInterval(interval);
            interval = null;
        };
    }
}
