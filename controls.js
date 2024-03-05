class Controls {
    constructor(canvas, x, y, linePart) {
        this.x = x;
        this.y = y;
        this.linePart = linePart;
        this.inputs = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.symbol = 0;
        this.isStop = false;
        this.canvas = canvas;
        this.keymap = [[7, 8, 9], [4, 5, 6], [1, 2, 3]]

        // this.#addKeyboardListeners();
        this.#addClickListeners();
    }

    #addClickListeners() {
        this.canvas.addEventListener('click', (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            if (!this.isStop) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (
                            x >= (this.x + this.linePart * j) &&
                            x <= (this.x + this.linePart * (j + 1)) &&
                            y >= (this.y + this.linePart * i) &&
                            y <= (this.y + this.linePart * (i + 1))
                        ) {
                            this.keyLocation(this.keymap[i][j]);
                        }
                    }
                }
            }
        });
    }

    #addKeyboardListeners() {
        document.onkeyup = (event) => {
            if (!this.isStop) {
                this.keyLocation(Number(event.key));
            }
        }
    }

    flip(index) {
        if (this.inputs[index] == -1) {
            this.inputs[index] = this.symbol;
        }
        if (this.symbol == 0) {
            this.symbol = 1;
        } else {
            this.symbol = 0;
        }
    }

    keyLocation(key) {
        switch (key) {
            case 7:
                this.flip(0);
                break;
            case 8:
                this.flip(1);
                break;
            case 9:
                this.flip(2);
                break;
            case 4:
                this.flip(3);
                break;
            case 5:
                this.flip(4);
                break;
            case 6:
                this.flip(5);
                break;
            case 1:
                this.flip(6);
                break;
            case 2:
                this.flip(7);
                break;
            case 3:
                this.flip(8);
                break;
        }
    }
}