class Game {
    constructor(currentPostition) {
        this.board = this.createBoard()
        this.knight = currentPostition
    }

    createBoard() {
        let board = []
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                board.push([j, i])
            }
        }
        return board
    }
}

class Node {
    constructor(root) {
        this.root = root
        this.one = null
        this.two = null
        this.three = null
        this.four = null
        this.five = null
        this.six = null
        this.seven = null
        this.eight = null
    }
}

function findIndexOfStart(find, board) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] == find[0] && board[i][1] == find[1]) {
            return i
        }
    }
    return 'not there'
}

function knightMoves(pieceStart, pieceEnd) {
    let game = new Game(pieceStart)
    let root = findIndexOfStart(game.knight, game.board)
    console.log(root)
    console.log(game.board[root + 6], game.board[root + 10], game.board[root + 15], game.board[root + 17],
        game.board[root - 6], game.board[root - 10], game.board[root - 15], game.board[root - 17])
    console.log(game.board)
    // let tree = buildTree(game.board[root], pieceEnd)
}

// options = 6, 10, 15, 17 


function buildTree(array, end) {
    let root = new Node(array)

    const positions = [[array + 1]]

    const options = [
        [array[0] + 1, array[1] + 2], //one
        [array[0] + 2, array[1] + 1], //two
        [array[0] + 2, array[1] - 1], //three
        [array[0] + 1, array[1] - 2], //four
        [array[0] - 1, array[1] - 2], //five
        [array[0] - 2, array[1] - 1], //six
        [array[0] - 2, array[1] + 1], //seven
        [array[0] - 1, array[1] + 2] //eight
    ]

    buildTree(root.one = new Node(options[0]))
    root.two = new Node(options[1])
    root.three = new Node(options[2])
    root.four = new Node(options[3])
    this.five = new Node(options[3])
    this.six = new Node(options[5])
    this.seven = new Node(options[6])
    this.eight = new Node(options[7])

    return
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

knightMoves([3, 6])
