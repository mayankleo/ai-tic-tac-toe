function scaleArray(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const scalingFactor = 1 / (max - min);
    return arr.map(value => scalingFactor * (value - min));
  }