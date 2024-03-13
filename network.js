class NeuralNetwork {
    constructor(levelStruc) {
        this.levels = [];
        for (let i = 0; i < levelStruc.length - 1; i++) {
            this.levels.push(new Level(levelStruc[i], levelStruc[i + 1]));
        }
    }

    static feedForward(inputs, network) {
        let outputs = Level.feedForward(inputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }
}

class Level {
    constructor(inputs, outputs) {
        this.inputs = new Array(inputs);
        this.outputs = new Array(outputs);
        this.weights = new Array(inputs);
        this.biases = new Array(outputs);

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = new Array(outputs);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(inputs, level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = inputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            level.outputs[i] = sum + level.biases[i]
        }
        
        level.outputs = sigmoidArray(level.outputs);
        return level.outputs;
    }
}