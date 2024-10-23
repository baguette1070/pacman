import {Bodies, World} from "matter-js";


export class Ghost {

    constructor(posX, posY) {

        this.posX = posX
        this.posY = posY

        this.ghostMob = Bodies.circle(this.posX, this.posY, 11, {
            render:{
                fillStyle:"white"
            }
        })

    }

    spawnMob(world){
        for (let i = 0; i < 4; i++) {
            World.add(world, this.ghostMob)
        }
    }

}