import { Engine, Render, Bodies, Body, World } from 'matter-js';
import {render} from "../main.js";

export class Pacman {

    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed

        this.body = Bodies.rectangle(50, 50, this.width, this.height, {
            render:{
                sprite:{
                    texture: "/public/birdPlayer.webp", // Image path
                    xScale: 0.1, // Scale the sprite down or up
                    yScale: 0.1
                }
            }
        })
        const engine = Engine.create()
        const world = engine.world
        World.add(world, this.body)
    }

    /*spawnPacman(){
        const engine = Engine.create()
        const world = engine.world
        const body = Bodies.rectangle(50, 50, this.width, this.height, {
            render:{
                sprite:{
                    texture: "/public/birdPlayer.webp", // Image path
                    xScale: 0.1, // Scale the sprite down or up
                    yScale: 0.1
                }
            }
        })
        return World.add(world, body)
    }*/
}
