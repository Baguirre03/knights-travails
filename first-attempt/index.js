/* eslint-disable no-array-constructor */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable max-classes-per-file */
class Game {
  constructor(currentPostition) {
    this.board = this.createBoard();
    this.knight = currentPostition;
  }

  createBoard() {
    const board = [];
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        board.push([j, i]);
      }
    }
    return board;
  }
}

class Node {
  constructor(data) {
    this.data = data;
  }
}

function findIndexOfStart(find, board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] == find[0] && board[i][1] == find[1]) {
      return i;
    }
  }
  return false;
}

function formatFinal(array, last) {
  let message = 'Path Taken: ';
  if (!array) {
    return message += `-> [${last}] -> [${last}] (doesnt move!)`;
  }
  array.forEach((array) => {
    message += `-> [${array}] `;
  });
  message += `-> [${last}]`;
  return message;
}

function knightMoves(pieceStart, pieceEnd) {
  if (pieceStart[0] > 8 || pieceStart[0] < 1 || pieceStart[1] > 8 || pieceStart[1] < 1
        || pieceEnd[0] > 8 || pieceEnd[0] < 1 || pieceEnd[1] > 8 || pieceEnd[1] < 1) {
    return 'Piece isnt on board!';
  } if (typeof pieceStart !== 'object' || typeof pieceEnd !== 'object') {
    return 'Please enter an array!';
  }

  const game = new Game(pieceStart);
  const root = findIndexOfStart(game.knight, game.board);
  const start = { name: 'root', array: game.board[root] };
  const final = buildTree(start, game.board, pieceEnd);

  if (!final.prev) {
    return formatFinal('', final.data);
  }
  return formatFinal(final.prev, final.data);
}

function buildTree(array, board, end, queue = ['fill']) {
  if (!queue.length) {
    return;
  }
  queue.splice(0, 1);

  const root = new Node(array.array);
  if (root == null) {
    array.parent[array.name] = null;
    return buildTree(queue[0], board, end, queue);
  }

  const options = {
    one: { name: 'one', array: [array.array[0] + 1, array.array[1] + 2], parent: root },
    two: { name: 'two', array: [array.array[0] + 2, array.array[1] + 1], parent: root },
    three: { name: 'three', array: [array.array[0] + 2, array.array[1] - 1], parent: root },
    four: { name: 'four', array: [array.array[0] + 1, array.array[1] - 2], parent: root },
    five: { name: 'five', array: [array.array[0] - 1, array.array[1] - 2], parent: root },
    six: { name: 'six', array: [array.array[0] - 2, array.array[1] - 1], parent: root },
    seven: { name: 'seven', array: [array.array[0] - 2, array.array[1] + 1], parent: root },
    eight: { name: 'eight', array: [array.array[0] - 1, array.array[1] + 2], parent: root },
  };

  if (!array.parent) {
    if (array.array[0] == end[0] && array.array[1] == end[1]) {
      return root;
    }
    queue.push(options.one, options.two, options.three, options.four, options.five, options.six, options.seven, options.eight);
    return buildTree(queue[0], board, end, queue);
  }

  const index = findIndexOfStart(array.array, board);
  if (index === false) {
    array.parent[array.name] = null;
    return buildTree(queue[0], board, end, queue);
  }

  if (array.parent.prev) {
    const a = array.parent.prev;
    const b = root.data;
    for (let i = 0; i < a.length; i++) {
      if (a[i][0] === b[0] && a[i][1] === b[1]) {
        return buildTree(queue[0], board, end, queue);
      }
    }
  }

  if (array.array[0] === end[0] && array.array[1] === end[1]) {
    if (array.parent.prev) {
      root.prev = Array(...array.parent.prev, array.parent.data);
    } else {
      root.prev = [array.parent.data];
    }
    array.parent[array.name] = root;
    queue.splice(1);
    return root;
  }

  if (array.parent) {
    if (array.parent.prev) {
      root.prev = Array(...array.parent.prev, array.parent.data);
    } else {
      root.prev = [array.parent.data];
    }
    array.parent[array.name] = root;
  }

  queue.push(options.one, options.two, options.three, options.four, options.five, options.six, options.seven, options.eight);
  return buildTree(queue[0], board, end, queue);
}


console.log(knightMoves([1, 1], [2, 3]));
console.log(knightMoves([1, 1], [4, 4]));
console.log(knightMoves([3, 3], [4, 3]));
console.log(knightMoves([1, 8], [1, 8]));

// error testing
console.log(knightMoves([4, 13], [1, 8]));
console.log(knightMoves('', [1, 8]));
console.log(knightMoves([1, 1], [1, 0]));
console.log(knightMoves('hello', [1, 1]));
