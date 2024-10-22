import {Bodies} from "matter-js";

export class Coins {

    constructor(posX, posY) {

        this.posX = posX
        this.posY = posY

        this.coins = Bodies.circle(this.posX, this.posY, 7, {
            isStatic:true,
            label:"coins",
            isSensor: true,
            render:{
                strokeStyle:"black",
                lineWidth:3,
                fillStyle:"yellow",
            }
        })
    }
}
