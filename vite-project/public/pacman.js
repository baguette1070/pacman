import { Engine, Bodies, World, Body } from 'matter-js';
import {CheckCollision} from "./checkColiision.js";

export class Pacman {

    constructor(positionXPacman, positionYPacman, radius) {
        this.positionXPacman = positionXPacman
        this.positionYPacman = positionYPacman
        this.radius = radius

        this.player = Bodies.circle(this.positionXPacman, this.positionYPacman, this.radius, {
            label:"pacmanBox",
            isStatic:false,
            frictionAir: 0.08,
            render:{
                fillStyle   :"yellow",
                strokeStyle:"black",
            },
        })
    }


    movePacman() {
        document.addEventListener('keydown', (event) => {
            const velocity = 3;
            if (event.key === 'z') {
                Body.setVelocity(this.player, { x: this.player.velocity.x, y: -velocity });
            } else if (event.key === 's') {
                Body.setVelocity(this.player, { x: this.player.velocity.x, y: velocity });
            } else if (event.key === 'q') {
                Body.setVelocity(this.player, { x: -velocity, y: this.player.velocity.y });
            } else if (event.key === 'd') {
                Body.setVelocity(this.player, { x: velocity, y: this.player.velocity.y });
            }
        });
    }
}
