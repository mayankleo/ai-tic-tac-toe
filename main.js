const myCanvas = document.getElementById('myCanvas');
myCanvas.width = 500;
myCanvas.height = 500;
ctx = myCanvas.getContext('2d');

var board = new Board(50, 50, myCanvas);

function animate() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    if (board.createNew) {
        delete board;
        board = new Board(50, 50, myCanvas);
        // board.controls.ai = JSON.parse(localStorage.getItem("bestBrain"));
    }
    board.draw(ctx);
    requestAnimationFrame(animate);
}

animate();