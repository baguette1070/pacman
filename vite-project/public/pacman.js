import { Bodies, Body } from 'matter-js';

export class Pacman {
    constructor(positionXPacman, positionYPacman, radius) {
        this.positionXPacman = positionXPacman;
        this.positionYPacman = positionYPacman;
        this.radius = radius;

        this.player = Bodies.circle(this.positionXPacman, this.positionYPacman, this.radius, {
            label: "pacmanBox",
            isStatic: false,
            frictionAir: 0,
            friction: 0,
            inertia: Infinity,
            render: {
                fillStyle: "yellow",
            },
        });
    }

    // Fonctions de mouvement de Pacman
    forward() {
        const velocity = 5;
        Body.setVelocity(this.player, { x: velocity, y: this.player.velocity.y });
    }

    moveDown() {
        const velocity = 5;
        Body.setVelocity(this.player, { x: this.player.velocity.x, y: velocity });
    }

    moveUp() {
        const velocity = 5;
        Body.setVelocity(this.player, { x: this.player.velocity.x, y: -velocity });
    }

    back() {
        const velocity = 5;
        Body.setVelocity(this.player, { x: -velocity, y: this.player.velocity.y });
    }

    getNextObjectRight(map, cellSize){
        return map[parseInt((this.player.position.y / cellSize))][parseInt((this.player.position.x / cellSize) + 1)]
    }

    getNextObjectDown(map ,cellSize){
        return map[parseInt((this.player.position.y / cellSize) + 1)][parseInt((this.player.position.x / cellSize))]
    }

    getBeforeObjectUp(map, cellSize){
        return map[parseInt((this.player.position.y / cellSize) - 1)][parseInt((this.player.position.x / cellSize))]
    }

    getBeforeObjectLeft(map, cellSize){
        return map[parseInt((this.player.position.y / cellSize))][parseInt((this.player.position.x / cellSize) - 1)]

    }

    movePacman(map) {
        document.addEventListener('keydown', (event) => {
            const cellSize = 30;

            switch (event.key) {
                case 'p':
                    break
                case 'z':
                    if(this.getBeforeObjectUp(map, cellSize) === 1){
                        Body.setVelocity(this.player, {x:0, y:0})
                        console.log(this.player.velocity)
                    } else {
                        console.log("Haut")
                        this.moveUp();
                    }
                    break;
                case 's':
                    if(this.getNextObjectDown(map, cellSize) === 1 ) {
                        Body.setVelocity(this.player, {x:0, y:0})
                        console.log(this.player.velocity)
                    } else {
                        console.log("Bas")
                        this.moveDown();
                    }
                    break;
                case 'q':
                    if(this.getBeforeObjectLeft(map, cellSize) === 1){
                        Body.setVelocity(this.player, {x:0, y:0})
                        console.log(this.player.velocity)
                    } else {
                        console.log("Gauche")
                        this.back()
                    }
                    break;
                case 'd':
                    if(this.getNextObjectRight(map, cellSize) === 1) {
                        Body.setVelocity(this.player, {x:0, y:0})
                        console.log(this.player.velocity)
                    }else{
                        console.log("Droite")
                        this.forward();
                    }
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            const cellSize = 30;
            switch (event.key) {
                case 'p':
                    break
                case 'z':
                    Body.setVelocity(this.player, {x:0, y:0})
                    break;
                case 's':
                    Body.setVelocity(this.player, {x:0, y:0})
                    break;
                case 'q':
                    Body.setVelocity(this.player, {x:0, y:0})
                    break;
                case 'd':
                    Body.setVelocity(this.player, {x:0, y:0})
                    break;
            }
        });

    }
}
