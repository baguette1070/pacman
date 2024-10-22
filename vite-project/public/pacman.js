import {Bodies, Body, Events, World} from 'matter-js';

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

    checkCollisionPlayerCoins(engine, world, tabCoins) {
        let compteur = 0;
        Events.on(engine, "collisionStart", (event) => {
            event.pairs.forEach((collision) => {
                const { bodyA, bodyB } = collision;

                if ((bodyA.label === 'pacmanBox' && bodyB.label === 'coins') ||
                    (bodyA.label === 'coins' && bodyB.label === 'pacmanBox')) {
                    const sound = new Audio("./sounds/tir.ogg")
                    const coinBody = bodyA.label === 'coins' ? bodyA : bodyB;

                    World.remove(world, coinBody);
                    compteur++;
                    console.log(compteur)
                    const coinIndex = tabCoins.indexOf(coinBody);
                    if (coinIndex !== -1) {
                        tabCoins.splice(coinIndex, 1);
                    }
                }
            });
        });
    }

    movePacman() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'p':
                    break;
                case 'z':
                    this.moveUp();
                    break;
                case 's':
                   this.moveDown()
                    break;
                case 'q':
                    this.back()
                    break;
                case 'd':
                    this.forward()
                    break;
            }
        });

        document.addEventListener('keyup', () => {
            Body.setVelocity(this.player, {x: 0, y: 0});
        });
    }




}
