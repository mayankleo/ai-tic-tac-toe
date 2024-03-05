class Board {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 400;
        this.lineWidth = 4;
        this.lineColor = "#ff0000";
        this.linePart = this.size / 3;
        this.winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]];
        this.win = { symbol: null, matrix: [] };
        this.pawn = new Pawn(this.x, this.y, this.size, this.linePart);
        this.controls = new Controls();
        this.createNew = false;
    }

    update() {
        for (let i = 0; i < this.winPatterns.length; i++) {
            if (
                this.controls.inputs[this.winPatterns[i][0]] == 0 &&
                this.controls.inputs[this.winPatterns[i][1]] == 0 &&
                this.controls.inputs[this.winPatterns[i][2]] == 0
            ) {
                this.win.symbol = 0;
                this.win.matrix = this.winPatterns[i];
                this.controls.isStop = true;
            } else if (
                this.controls.inputs[this.winPatterns[i][0]] == 1 &&
                this.controls.inputs[this.winPatterns[i][1]] == 1 &&
                this.controls.inputs[this.winPatterns[i][2]] == 1
            ) {
                this.win.symbol = 1;
                this.win.matrix = this.winPatterns[i];
                this.controls.isStop = true;
            }
        }

        if (!this.controls.inputs.includes(-1) && (this.win.symbol == null)) {
            this.win.symbol = -1
            setTimeout(() => {
                this.createNew=true;
            }, 2000);
        }

        if(this.win.symbol != null){
            setTimeout(() => {
                this.createNew=true;
            }, 2000);
        }
    }

    draw(ctx) {
        this.update();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x, this.y);

        ctx.moveTo(this.x + this.linePart, this.y);
        ctx.lineTo(this.x + this.linePart, this.y + this.size);

        ctx.moveTo(this.x + this.linePart * 2, this.y);
        ctx.lineTo(this.x + this.linePart * 2, this.y + this.size);

        ctx.moveTo(this.x, this.y + this.linePart);
        ctx.lineTo(this.x + this.size, this.y + this.linePart);

        ctx.moveTo(this.x, this.y + this.linePart * 2);
        ctx.lineTo(this.x + this.size, this.y + this.linePart * 2);

        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();

        for (let i = 0; i < 9; i++) {
            if (this.controls.inputs[i] == 0) {
                this.pawn.drawCircle(ctx, i);
            } else if (this.controls.inputs[i] == 1) {
                this.pawn.drawCross(ctx, i);
            }
        }

        if (this.win.symbol != null) {
            this.pawn.drawWinLine(this.win.matrix, this.win.symbol);
        }
    }
}