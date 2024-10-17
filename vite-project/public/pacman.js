import { Engine, Bodies, World, Body } from 'matter-js';

export class Pacman {

    constructor(positionXPacman, positionYPacman, width, height, speed) {
        this.positionXPacman = positionXPacman
        this.positionYPacman = positionYPacman
        this.width = width
        this.height = height
        this.speed = speed

        this.player = Bodies.rectangle(this.positionXPacman, this.positionYPacman, this.width, this.height, {
            isStatic:true,
            label:"pacmanBox",
            render:{
                sprite:{
                    texture: "../assets/pacman.png",
                    xScale: this.width / 1200,
                    yScale: this.height / 1200,
                }
            }
        })
    }


    movePacman(){
        window.addEventListener("keydown", (event) => {
            switch (event.key){
                case 'd':
                    Body.setPosition(this.player, { x: this.positionXPacman + this.speed, y: this.positionYPacman});
                    this.positionXPacman += this.speed
                    break
                case 'q':
                    Body.setPosition(this.player, { x: this.positionXPacman - this.speed, y: this.positionYPacman})
                    this.positionXPacman -= this.speed
                    break
                case 'z':
                    Body.setPosition(this.player, { x: this.positionXPacman, y : this.positionYPacman - this.speed})
                    this.positionYPacman -= this.speed
                    break
                case 's':
                    Body.setPosition(this.player, { x: this.positionXPacman, y : this.positionYPacman + this.speed})
                    this.positionYPacman += this.speed
                    break
            }
            console.log(`{ x : ${this.positionXPacman}, y : ${this.positionYPacman}}`)
        })
    }

}
