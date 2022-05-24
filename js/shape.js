export default class Shape {
    constructor(shape, game) {
        Object.assign(this, shape);
        this.game = game;
    };

    spawn() {
        const bigger = Array.from(this.game.field.body.children).slice(0, 4)
            .map(row => Array.from(row.children).slice(5, 9));

        const smaller = bigger.slice(0, -1).map(row => row.slice(0, -1));

        const area = () => {
            switch (this.name) {
                case 'I':
                case 'Q':
                    return bigger;
                default:
                    return smaller;
            };
        }

        this.area = area();

        this.display();
    }

    clearArea(area) {
        area.forEach(block => {

            if (!block.dataset.folded) this.uncolor(block);
            delete block.dataset.active;
        });
    }

    display() {
        const _blocks_ = this.area.flat();

        this.form.flat().forEach((element, i) => {
            if (element) {
                this.colorize(_blocks_[i]);
                _blocks_[i].dataset.active = true;
            };
            // else _blocks_[i].classList.add('--inactive');
        });
    }
    colorize(block) {
        block.classList.add('--active', this.color);
        block.dataset.color = this.color;
    }
    uncolor(block) {
        block.classList.remove('--active', this.color);
        delete block.dataset.color;
    }

    descend() {
        this.previousPosition = this.area;
        this.area = this.area.map(
            set => set.map(
                block => block.parentNode.nextElementSibling.children[+block.dataset.index + 2]));
    }

    move(side) {
        const toSibling = {
            left: 'previousElementSibling',
            right: 'nextElementSibling'
        }[side];

        this.area = this.area.map(set => set.map(block => block[toSibling]));
    }

    turn() {
        const form = [].concat(this.form).reverse();

        this.form =
            form.map((level, i) => form.map(level => level[i]));
    }

    deactivate() {
        this.activeElements.forEach(item => {
            item.dataset.folded = 'true';
            delete item.dataset.active;
        });
    }

    fix() {
        this.deactivate();
        this.blocksBySides.forEach(item => item.dataset.noMove = 'true');
        this.blocksBelow.forEach(item => item.dataset.noDescend = 'true');
    }





    get blocksBySides() {
        return [].concat(
                this.foldedElements
                .map(item => item.previousElementSibling),

                this.foldedElements
                .map(item => item.nextElementSibling)
            )
            .filter(item => !item.dataset.folded);
    }

    get blocksBelow() {
        return this.foldedElements
            .map(item => item.parentNode.previousElementSibling.children[+item.dataset.index + 2])
            .filter(item => !item.dataset.folded)
    }





    get foldedElements() {
        return this.area.flat().filter(block => block.dataset.folded)
    }
    get activeElements() {
        return this.area.flat().filter(block => block.dataset.active);
    }
}