import Shape from './shape.js';

export default class Controller {
    constructor(game) {
        this.game = game;
        this.field = game.field;

        document.addEventListener('keydown', e => {
            const handler = {
                ArrowUp() { this.turnShape() },
                ArrowLeft() { this.moveShape('left') },
                ArrowRight() { this.moveShape('right') },
                ArrowDown() { this.descendShape() },
                // Space() { this.putDownShape() },
            }
            handler[e.code].call(this);
            console.log(game);
        });
    }

    launchGame() {
        this.gameState.launched = true;
        this.refresh();

    }
    stopGame() {
        this.gameState.launched = false;
        this.stopDescending();
    }





    refresh() {
        this.resetState();
        this.stopDescending();
        this.revealNewShape();
        // this.startDescending();
    }
    resetState() {
        this.gameState.reset();
    }





    startDescending() {
        this.gameState.descending = setInterval(this.lowerLevel.bind(this), 2000);
    }
    stopDescending() {
        clearInterval(this.gameState.descending);
    }
    revealNewShape() {
        this.gameState.shape = this.createNewShape();
        this.shape = this.gameState.shape;
        this.shape.spawn();
    }
    createNewShape() {
        const randomIndex = Math.floor(Math.random() * (this.game.shapes.length - 1));

        return new Shape(
            this.game.shapes[randomIndex],
            this.game
        );
    }





    turnShape() {
        if (this.gameState.beyondField) return;

        this.shape.clearArea(this.shape.area.flat());
        this.shape.turn();
        this.shape.display();


        this.gameState.edgeReached = this.gameState._edgeReached_;
    }
    moveShape(side) {
        if (
            this.gameState.movementBlocked ||
            (
                this.gameState.edgeReached &&
                this.gameState.reachedSide === side
            )
        )
            return;


        this.shape.clearArea(this.shape.area.flat());
        this.shape.move(side);
        this.shape.display();


        this.gameState.edgeReached = this.gameState._edgeReached_;
    }
    descendShape() {
        this.shape.clearArea(
            [].concat(
                this.shape.previousPosition.flat(),
                this.shape.area.flat()
            )
        );
        this.shape.descend();
        this.shape.display();


        if (this.gameState.descendingBlocked ||
            this.gameState.bottomReached) {
            this.fixShape();
            this.refresh();
        };

        this.gameState.filledLines = this.gameState._filledLines_;
        if (this.gameState.filledLines.length > 0) {
            this.clearLines();
            this.rebuildField();
        };
    }
    fixShape() {
        this.shape.fix();
    }





    clearLines() {
        this.gameState.filledLines.flat().forEach(clearLine)

        function clearLine(line) {
            Array.from(line.children).forEach(
                item => {
                    const color = item.dataset.color;

                    item.classList.remove('--active', color);
                    [
                        'active',
                        'folded',
                        'color',
                        'noMove',
                        'noDescend',
                        'bottom',
                    ]
                    .forEach(data => delete item.dataset[data])
                }
            );
        };
    }

    rebuildField() {
        const field = this.game.field.body;

        // this.gameState.filledLines.map(
        //     line => line.previousElementSibling).forEach(
        //     line => Array.from(line.children).forEach(
        //         item => { if (item.dataset.folded) delete item.dataset.noDescend }))

        const rebuilt = (() => {
            this.gameState.filledLines
                .forEach(pack => {
                    let fieldRows = Array.from(field.children);

                    let rows = [].concat(
                        pack,
                        fieldRows.slice(0, +pack[0].previousElementSibling.dataset.index + 1),
                        fieldRows.slice(-(fieldRows.length - (+pack.slice().pop().nextElementSibling.dataset.index))),
                    );

                    field.innerHTML = '';

                    rows.forEach((row, i) => field.appendChild(row).dataset.index = i);
                });
        })();

        const fixBottom = (() => {
            const bottom = Array.from(Array.from(field.children).slice(-3)[0].children);

            bottom.forEach(item => {
                delete item.dataset.noDescend;
                item.dataset.bottom = 'true'
            });
        })();
    }
}