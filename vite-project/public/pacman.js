import { Engine, Bodies, World, Body } from 'matter-js';

export class Pacman {

    constructor(positionXPacman, positionYPacman, radius) {
        this.positionXPacman = positionXPacman
        this.positionYPacman = positionYPacman
        this.radius = radius

        this.player = Bodies.circle(this.positionXPacman, this.positionYPacman, 11, {
            label:"pacmanBox",
            isStatic:false,
            frictionAir: 0,
            friction:0,
            inertia: Infinity,
            render:{
                fillStyle   :"yellow",
            },
        })
    }


    forward(){
        const velocity = 5;
        Body.setVelocity(this.player, {x: velocity, y: this.player.velocity.y})
    }

    moveDown(){
        const velocity = 5;
        Body.setVelocity(this.player, {x: this.player.velocity.x, y: velocity})
    }

    moveUp(){
        const velocity = 5;
        Body.setVelocity(this.player, {x: this.player.velocity.x, y: -velocity})

    }

    back(){
        const velocity = 5;
        Body.setVelocity(this.player, {x: - velocity, y: this.player.velocity.y})

    }

    movePacman() {
        document.addEventListener('keydown', (event) => {
            switch (event.key){
                case 'p':
                    break
                case 'z':
                    this.moveUp()
                    break
                case 's':
                    this.moveDown()
                    break
                case 'q':
                    this.back()
                    break
                case 'd':
                    this.forward()
                    break

            }
        });
    }
}
