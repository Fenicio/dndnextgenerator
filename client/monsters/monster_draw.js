Template.monsterDraw.rendered = function() {
    this.myBoard = new DrawingBoard.Board('drawingboard', {
        controls: [
            'Color',
            'DrawingMode',
            { Size: { type: 'dropdown' } },
            'Navigation'
            ]
    });
};