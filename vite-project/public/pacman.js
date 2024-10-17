import { Engine, Bodies, World } from 'matter-js';

export class Pacman {

    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, {
            render:{
                sprite:{
                    texture: "/pacman.png",
                    xScale: this.width,
                    yScale: this.height,
                    wireframes: false
                }
            }
        })
        const engine = Engine.create()
        const world = engine.world
        World.add(world, this.body)
    }

}
