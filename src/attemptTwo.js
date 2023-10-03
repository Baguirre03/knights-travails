/* eslint-disable no-return-assign */
/* eslint-disable no-console */
class Piece {
  constructor(x, y, prev) {
    this.x = x;
    this.y = y;
    this.prev = prev || null;
    this.moves = null;
  }

  tests = (num) => (num > 8 || num < 1);

  setMoves(moves) {
    this.moves = moves;
  }

  numberfy() {
    return this.x.toString() + this.y.toString();
  }

  getAdjacents() {
    return [
      [1, 2], [1, -2],
      [2, 1], [2, -1],
      [-1, 2], [-1, -2],
      [-2, 1], [-2, -1],
    ];
  }

  setAvailableCords() {
    const cords = this.getAdjacents();
    const options = cords.map((opt) => {
      if (this.tests(this.x) || this.tests(this.y)) return null;
      return new Piece(opt[0] + this.x, opt[1] + this.y, this);
    }).filter((n) => n);
    this.setMoves(options);
  }
}

const traverse = (piece) => {
  const final = [];
  while (piece !== null) {
    final.push([piece.x, piece.y]);
    piece = piece.prev;
  }
  let string = 'Path taken:';
  final.reverse().forEach((arr) => string += ` -> [${arr[0]}, ${arr[1]}]`);
  return string;
};

const search = (piece, find) => {
  const queue = [];
  const visited = [];

  let curr = piece;
  curr.moves.forEach((child) => queue.push(child));

  while (queue.length > 0) {
    if (visited.includes(curr.numberfy())) {
      queue.shift();
      curr = queue[0];
    }

    if (curr.x === find[0] && curr.y === find[1]) return traverse(curr);

    visited.push(curr.numberfy());
    curr.setAvailableCords();
    curr.moves.forEach((child) => queue.push(child));
    queue.shift();
  }
  return null;
};

const KT = ([x, y], [findX, findY]) => {
  const start = new Piece(x, y);
  start.setAvailableCords();
  return search(start, [findX, findY]);
};

console.log(KT([1, 3], [2, 7]));
console.log(KT([3, 3], [1, 8]));
