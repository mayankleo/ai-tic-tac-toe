class Pawn {
    constructor(x, y, size, linePart, inputs = []) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.linePart = linePart;
        this.inputs = inputs;
        this.coordinates = this.#calCoordinates();
        this.radius = (linePart - 50) / 2;
        this.circleColor = "#00ff00";
        this.crossColor = "#0000ff";
        this.winColor = "#ffffff";
    }

    #calCoordinates() {
        let cord = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cord.push({
                    x: ((this.x + this.linePart * j) + (this.x + this.linePart * (j + 1))) / 2,
                    y: ((this.y + this.linePart * i) + (this.y + this.linePart * (i + 1))) / 2
                });
            }
        }
        return cord;
    }

    drawCircle(ctx, index = 0) {
        ctx.beginPath();
        ctx.arc(this.coordinates[index].x, this.coordinates[index].y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.circleColor;
        ctx.stroke();
    }

    drawCross(ctx, index = 0) {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[index].x - this.radius, this.coordinates[index].y - this.radius);
        ctx.lineTo(this.coordinates[index].x + this.radius, this.coordinates[index].y + this.radius);
        ctx.strokeStyle = this.crossColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.coordinates[index].x + this.radius, this.coordinates[index].y - this.radius);
        ctx.lineTo(this.coordinates[index].x - this.radius, this.coordinates[index].y + this.radius);
        ctx.strokeStyle = this.crossColor;
        ctx.stroke();
    }

    drawWinLine(matrix, symbol) {
        if (matrix.length != 0) {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[matrix[0]].x, this.coordinates[matrix[0]].y);
            ctx.lineTo(this.coordinates[matrix[2]].x, this.coordinates[matrix[2]].y);
            ctx.strokeStyle = this.winColor;
            ctx.stroke();
        }

        ctx.font = '30px Arial';
        ctx.fillStyle = '#ffffff';
        let symbolText = symbol == 0 ? 'O WON THE MATCH !' : symbol == 1 ? 'X WON THE MATCH !' : 'MATCH DRAW !';
        ctx.fillText(symbolText, this.x, this.y - 5);
    }
}