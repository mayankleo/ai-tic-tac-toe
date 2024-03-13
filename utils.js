function sigmoidArray(arr) {
  return arr.map(h => 1 / (1 + Math.exp(-h)));
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function deleteByValue(arr, value) {
  return arr.filter(element => element !== value);
}

async function delayFunction() {
  await new Promise(resolve => setTimeout(resolve, 1000));
}

function findElementsSorted(arr) {
  const sortedArray = [...arr];
  sortedArray.sort((a, b) => b - a);
  const results = [];
  for (let i = 0; i < sortedArray.length; i++) {
    const originalIndex = arr.indexOf(sortedArray[i]);
    results.push(originalIndex);
  }
  return results;
}

function checkwin(input, symbol) {
  let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < winPatterns.length; i++) {
    if (
      input[winPatterns[i][0]] == symbol &&
      input[winPatterns[i][1]] == symbol &&
      input[winPatterns[i][2]] == symbol
    ) {
      return true;
    }
  }
  return false;
}

function minimax(inputArr, turnSymbol) {
  if (checkwin(inputArr, -1)) {
    return { score: -10 };
  } else if (checkwin(inputArr, 1)) {
    return { score: 10 };
  } else if (!inputArr.includes(0)) {
    return { score: 0 };
  }

  let rem = []
  inputArr.forEach((el, index) => {
    if (el == 0) {
      rem.push(index);
    }
  });
  let moves = [];
  for (let i = 0; i < rem.length; i++) {
    let move = {};
    move.index = rem[i]
    inputArr[rem[i]] = turnSymbol;
    if (turnSymbol == 1) {
      let g = minimax(inputArr, -1);
      move.score = g.score;
    } else {
      let g = minimax(inputArr, 1);
      move.score = g.score;
    }
    inputArr[rem[i]] = 0;
    moves.push(move);
  }

  let positive = [];
  let nutral = [];
  let negative = [];
  for (var i = 0; i < moves.length; i++) {
    if (moves[i].score == (turnSymbol == 1 ? 10 : -10)) {
      positive.push(moves[i])
    } else if (moves[i].score == 0) {
      nutral.push(moves[i])
    } else {
      negative.push(moves[i])
    }
  }
  if (Array.isArray(positive) && positive.length > 0) {
    return pickRandom(positive);
  } else if (Array.isArray(nutral) && nutral.length > 0) {
    return pickRandom(nutral);
  } else {
    return pickRandom(negative);
  }
}