import Controller from './controller.js';
import GameState from './game state.js';
import createWithInputs from './input.js';






class Game {
    constructor() {
        Object.assign(this, createWithInputs())

        this.gameState = new GameState(this);
        this.controller = new Controller(this);

        Object.defineProperty(this.field, 'bounds', {
            get() {
                return this.rows.slice(0, this.height)
                    .map(row => [...row.children]
                        .filter(item => !item.dataset.beyond))
            }
        })

        this.controller.gameState = this.gameState;
        this.gameState.controller = this.controller;
    }
    launch() {
        this.controller.launchGame();
    }
    stop() {
        this.controller.stopGame();
    }
};


const game = new Game();

game.launch();