const shapes = (() => {
    let shapes = [{
            name: 'I',
            form: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            color: 'orange'
        },
        {
            name: 'T',
            form: [
                [1, 1, 1],
                [0, 1, 0],
                [0, 0, 0]
            ],
            color: 'turquoise'
        },
        {
            name: 'L',
            form: [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
            ],
            color: 'yellow'
        },
        {
            name: 'J',
            form: [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ],
            color: 'red'
        },
        {
            name: 'Z',
            form: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ],
            color: 'blue'
        },
        {
            name: 'S',
            form: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ],
            color: 'green'
        },
        {
            name: 'Q',
            form: [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            color: 'pink'
        },
    ]
    shapes.forEach(shape => shape.default = shape.form)
    return shapes;
})();

export default shapes;