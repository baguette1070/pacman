import { Bodies, Body } from 'matter-js';

export class Pacman {
    constructor(positionXPacman, positionYPacman, radius) {
        this.positionXPacman = positionXPacman;
        this.positionYPacman = positionYPacman;
        this.radius = radius;

        // Création du corps du Pacman
        this.player = Bodies.circle(this.positionXPacman, this.positionYPacman, radius, {
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

    // Méthode pour détecter les collisions et s'arrêter avant le mur
    checkCollision(tabWall, map) {
        const cellSize = 30;
        const buffer = 5; // Distance avant le mur pour arrêter Pacman
        let getMapY = parseInt((this.player.position.y / cellSize) + 1)
        let getMapX = parseInt((this.player.position.x / cellSize) + 1)

        //console.log(getMapX)
        //console.log(getMapY)

        tabWall.forEach((wall) => {
            const pacmanX = this.player.position.x;
            const pacmanY = this.player.position.y;
            const wallX = map[getMapX][getMapY];
            const wallY = getMapY;



        });
    }

    // Méthode pour gérer les touches de direction
    movePacman(map) {
        document.addEventListener('keydown', (event) => {
            const cellSize = 30;
            let a = map[parseInt((this.player.position.y / cellSize) + 1)][parseInt((this.player.position.x / cellSize) + 1)]
            switch (event.key) {
                case 'p':
                    console.log(a)
                    console.log(parseInt((this.player.position.y / cellSize) + 1))
                    console.log(parseInt((this.player.position.x / cellSize) + 1))
                    break
                case 'z':
                    this.moveUp();
                    break;
                case 's':
                    this.moveDown();
                    break;
                case 'q':
                    this.back();
                    break;
                case 'd':
                    this.forward();
                    break;
            }
        });
    }
}
