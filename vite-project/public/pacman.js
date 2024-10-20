import { Bodies, Body } from 'matter-js';

export class Pacman {
    constructor(positionXPacman, positionYPacman, radius) {
        this.positionXPacman = positionXPacman;
        this.positionYPacman = positionYPacman;
        this.radius = radius;

        // Variables de contrôle pour chaque direction
        this.canGoTop = true;
        this.canGoRight = true;
        this.canGoLeft = true;
        this.canGoDown = true;

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

    // Fonctions pour vérifier les objets à proximité
    getNextObjectRight(map, cellSize) {
        return map[parseInt(this.player.position.y / cellSize)][parseInt(this.player.position.x / cellSize) + 1];
    }

    getNextObjectDown(map, cellSize) {
        return map[parseInt(this.player.position.y / cellSize) + 1][parseInt(this.player.position.x / cellSize)];
    }

    getBeforeObjectUp(map, cellSize) {
        return map[parseInt(this.player.position.y / cellSize) - 1][parseInt(this.player.position.x / cellSize)];
    }

    getBeforeObjectLeft(map, cellSize) {
        return map[parseInt(this.player.position.y / cellSize)][parseInt(this.player.position.x / cellSize) - 1];
    }

    movePacman(map) {
        document.addEventListener('keydown', (event) => {
            const cellSize = 30;
            let interval = null;

            switch (event.key) {
                case 'p':
                    break;
                case 'z':
                    if (this.canGoTop) {
                        interval = setInterval(() => {
                            if (this.getBeforeObjectUp(map, cellSize) === 1) {
                                clearInterval(interval);
                                Body.setVelocity(this.player, { x: 0, y: 0 });
                                Body.setPosition(this.player, { x: this.player.position.x, y: this.player.position.y - 8 });
                                this.canGoTop = false;
                            } else {
                                console.log("Haut");
                                this.canGoTop = true
                                this.moveUp();

                            }
                        });
                    }
                    break;
                case 's':
                    if (this.canGoDown) {
                        if (this.getNextObjectDown(map, cellSize) === 1) {
                            Body.setVelocity(this.player, { x: 0, y: 0 });
                            Body.setPosition(this.player, { x: this.player.position.x, y: this.player.position.y + 1 });
                            this.canGoDown = false;
                        } else {
                            console.log("Bas");
                            this.canGoDown = true;
                            this.moveDown();
                        }
                    }
                    break;
                case 'q': // Mouvement vers la gauche
                    if (this.canGoLeft) {
                        if (this.getBeforeObjectLeft(map, cellSize) === 1) {
                            Body.setVelocity(this.player, { x: 0, y: 0 });
                            this.canGoLeft = false;
                        } else {
                            console.log("Gauche");
                            this.canGoLeft = true
                            this.back();
                        }
                    }
                    break;
                case 'd':
                    if (this.canGoRight) {
                        if (this.getNextObjectRight(map, cellSize) === 1) {
                            Body.setVelocity(this.player, { x: 0, y: 0 });
                            this.canGoRight = false;
                        } else {
                            console.log("Droite");
                            this.canGoRight = true
                            this.forward();
                        }
                    }
                    break;
            }
        });
    }

}
