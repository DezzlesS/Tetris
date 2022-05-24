import shapes from './shapes.js'
import fieldHTML from './field2.js'
const shapesPatterns = shapes;

const size = { width: 10, height: 20 };

export default function createWithInputs() {

    const general = {


        html: {
            field: document.getElementById('field'),
            rows: Array.from(document.getElementsByClassName('row')),
            cells: Array.from(document.getElementsByClassName('cell')),
        },
        fieldWidth: size.width,
        fieldHeight: size.height,
    };


    const field = {
        field: {
            body: general.html.field,

            rows: general.html.rows,
            cells: general.html.cells,

            width: general.fieldWidth,
            height: general.fieldHeight,

            leftEdge: general.html.cells
                .filter(cell => cell.dataset.index == 0)
                .map(item => {
                    item.dataset.edge = true;
                    item.dataset.edgeSide = 'left';
                    return item
                }),
            rightEdge: general.html.cells
                .filter(cell => cell.dataset.index == general.fieldWidth - 1)
                .map(item => {
                    item.dataset.edge = true;
                    item.dataset.edgeSide = 'right';
                    return item
                }),

            beyondLeft: general.html.cells
                .filter(cell => cell.dataset.index < 0)
                .map(item => { item.dataset.beyond = true; return item }),
            beyondRight: general.html.cells
                .filter(cell => cell.dataset.index > general.fieldWidth - 1)
                .map(item => { item.dataset.beyond = true; return item }),

            bottom: Array.from(general.html.rows.slice(-3)[0].children)
                .map(item => { item.dataset.bottom = true; return item }),
            beyondBottom: {
                rows: general.html.rows.slice(-2),
                cells: general.html.rows.slice(-2)
                    .map(row => Array.from(row.children))
                    .flat()
                    .map(item => { item.dataset.beyond = true; return item }),
            },
        }
    };


    const shapes = (() => {
        const bigger =
            general.html.rows.slice(0, 4)
            .map(row =>
                Array.from(row.children).slice(5, 9));
        const smaller = bigger.slice(0, -1).map(row => row.slice(0, -1));


        return {
            shapes: (() => {
                return shapesPatterns.map(shape => {

                    shape.startPosition = shapeArea(shape.name);
                    shape.area = shape.startPosition;
                    shape.previousPosition = shape.area;

                    return shape;


                    function shapeArea(name) {
                        switch (name) {
                            case 'I':
                            case 'Q':
                                return bigger;
                            default:
                                return smaller;
                        };
                    };
                })
            })()
        };
    })();

    const output = Object.assign(general, field, shapes);

    return output;
}