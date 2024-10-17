import {Bodies} from "matter-js";

export class Coins {

    constructor(positionXCoin, positionYCoins, width, height, value) {
        this.positionXCoin = positionXCoin
        this.positionYCoins = positionYCoins
        this.value = value
        this.width = width
        this.height = height

        this.coins = Bodies.circle(this.positionXCoin, this.positionYCoins, this.width,{
            isStatic:true,
            render:{
                sprite:{
                    texture:"../assets/coin_no_background.png",
                    xScale: this.width / 1200,
                    yScale: this.height / 1200,
                }
            }
        })
    }
}
