class Controls {
    constructor() {
        this.inputs = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.symbol = 0;
        this.isStop = false;
        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        document.onkeyup = (event) => {
            if (!this.isStop) {
                switch (event.key) {
                    case "7":
                        this.flip(0);
                        break;
                    case "8":
                        this.flip(1);
                        break;
                    case "9":
                        this.flip(2);
                        break;
                    case "4":
                        this.flip(3);
                        break;
                    case "5":
                        this.flip(4);
                        break;
                    case "6":
                        this.flip(5);
                        break;
                    case "1":
                        this.flip(6);
                        break;
                    case "2":
                        this.flip(7);
                        break;
                    case "3":
                        this.flip(8);
                        break;
                }
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
}