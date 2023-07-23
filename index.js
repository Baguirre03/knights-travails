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
        this.data = root
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
    return null
}

function knightMoves(pieceStart, pieceEnd) {
    let game = new Game(pieceStart)
    let root = findIndexOfStart(game.knight, game.board)

    let tree = buildTree(game.board[root], game.board, pieceEnd)
    console.log(tree)

}

// options = 6, 10, 15, 17 


function buildTree(array, board, end) {
    let root = new Node(array)

    if (array[0] * array[1] > 64) return null
    if (array[0 * array[1] < 1]) return null
    if (findIndexOfStart(array, board) == null) {
        return null
    }
    if (array[0] == end[0] && array[1] == end[1]) { return root }

    let options = [
        [array[0] + 1, array[1] + 2], //one
        [array[0] + 2, array[1] + 1], //two
        [array[0] + 2, array[1] - 1], //three
        [array[0] + 1, array[1] - 2], //four
        [array[0] - 1, array[1] - 2], //five
        [array[0] - 2, array[1] - 1], //six
        [array[0] - 2, array[1] + 1], //seven
        [array[0] - 1, array[1] + 2] //eight
    ]

    root.one = new Node(buildTree(options[0], board, end))
    // root.two = new Node(buildTree(options[1], board, end))
    // root.three = new Node(buildTree(options[2], board, end))
    // root.four = new Node(buildTree(options[3], board, end))
    // root.five = new Node(buildTree(options[4], board, end))
    // root.six = new Node(buildTree(options[5], board, end))
    // root.seven = new Node(buildTree(options[6], board, end))
    // root.eight = new Node(buildTree(options[7], board, end))

    return root
}

knightMoves([1, 1], [2, 3])
