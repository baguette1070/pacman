import {Body, Events, World} from "matter-js";

export class CheckCollision {

    constructor() {
    }

    checkCollisionPiece(engine, tabCoins, world){
        Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((collision) => {
            if ((collision.bodyA.label === 'pacmanBox' && collision.bodyB.label === 'coins') ||
                (collision.bodyA.label === 'coins' && collision.bodyB.label === 'pacmanBox')) {
                const coin = collision.bodyA.label === 'coins' ? collision.bodyA : collision.bodyB;
                World.remove(world, coin);
                const coinIndex = tabCoins.findIndex(c => c.coins === coin);
                if (coinIndex !== -1) {
                    tabCoins.splice(coinIndex, 1);
                }
        }
            return tabCoins
        });
        });
    }

    checkCollisionWall(engine, tabWall, player) {
        let collisionDetected = false;
        Events.on(engine, 'collisionStart', (event) => {
            event.pairs.forEach((collision) => {
                if ((collision.bodyA.label === 'pacmanBox' && collision.bodyB.label === 'wall') ||
                    (collision.bodyA.label === 'wall' && collision.bodyB.label === 'pacmanBox')) {
                    collisionDetected = true;
                }
            });
        });
        return collisionDetected;
    }
x

}