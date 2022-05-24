export default class GameState {
    constructor(game) {
        this.game = game;
        this.launched;

        this.descending;

        this.edgeReached;
        this.reachedSide;
        // this.bottomReached;  //getter
        // this.beyondField;  //getter

        // this.field = game.field;
    };

    reset() {
        this.edgeReached = undefined;
        this.reachedSide = undefined;
    }





    get shapeArea() {
        return this.shape.area;
    }
    get activeElements() {
        return this.shape.activeElements;
    }





    get _edgeReached_() {
        const reached = this.activeElements.find(block => block.dataset.edge);

        this.reachedSide =
            reached === undefined ?
            'none' :
            reached.dataset.edgeSide;

        return reached !== undefined;
    }





    get beyondField() {
        return this.shapeArea.flat().some(block => block.dataset.beyond);
    }
    get bottomReached() {
        return this.activeElements.some(block => block.dataset.bottom);
    }





    get movementBlocked() {
        return this.activeElements.some(
            item => item.dataset.noMove === 'true'
        );
    }
    get descendingBlocked() {
        return this.activeElements.some(
            item => item.dataset.noDescend === 'true'
        );
    }





    get _filledLines_() {

        const filled = Array.from(
            this.game.field.bounds
            .filter(row => row.every(item => item.dataset.folded))
            .map(item => item[0].parentNode)
        );

        return getPacks();


        function getPacks() {
            const packs = [];

            for (let i = 0; i < filled.length; i++) {
                let pack = [filled[i]];

                if (filled[i + 1] === filled[i].nextElementSibling) {
                    for (let n = i; n < 4; n++) {
                        if (filled[n + 1] === filled[n].nextElementSibling) {
                            pack.push(filled[n + 1]);
                        } else {
                            i = n;
                            break
                        };
                    };
                }
                packs.push(pack)
            };
            return packs.reverse();
        };
    }
}