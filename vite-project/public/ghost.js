import {Bodies} from "matter-js";


export class Ghost {

    constructor(posX, posY) {

        this.posX = posX
        this.posY = posY

        this.ghostMob = Bodies.circle(this.posX, this.posY, 11, {
            render:{
                fillStyle:"red"
            }
        })
    }

}