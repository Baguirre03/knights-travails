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
    return false
}

function knightMoves(pieceStart, pieceEnd) {
    let game = new Game(pieceStart)
    let root = findIndexOfStart(game.knight, game.board)

    let tree = buildTree(game.board[root], game.board, pieceEnd)
    console.log(tree)
    // let final = searchTree(tree)
    // console.log(final)
}

function buildTree(array, board, end, visted = []) {
    let root = new Node(array)
    if (root == null) return

    let index = findIndexOfStart(array, board)
    if (index == false) return null

    if (array[0] == end[0] && array[1] == end[1]) {
        return root
    }

    if (visted.includes(index)) return null
    visted.push(index)

    if (array[0] * array[1] > 64) return null
    if (array[0] * array[1] < 1) return null


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

    root.one = buildTree(options[0], board, end, visted)
    root.two = buildTree(options[1], board, end, visted)
    root.three = buildTree(options[2], board, end, visted)
    root.four = buildTree(options[3], board, end, visted)
    root.five = buildTree(options[4], board, end, visted)
    root.six = buildTree(options[5], board, end, visted)
    root.seven = buildTree(options[6], board, end, visted)
    root.eight = buildTree(options[7], board, end, visted)

    return root
}

// function searchTree(tree, queue = ['filler'], final = []) {
//     if (tree.one == null && tree.two == null && tree.three == null && tree.four == null && tree.five == null && tree.six == null && tree.seven == null && tree.eight == null) {
//         return final
//     }
//     if (!queue.length) {
//         return final
//     }

//     queue.splice(0, 1)

//     if (tree == null) {
//         return searchTree(queue[0], queue)
//     }
//     console.log(tree.data)
//     final.push(tree.data)

//     if (tree.one != null) {
//         queue.push(tree.one)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.two != null) {
//         queue.push(tree.two)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.three != null) {
//         queue.push(tree.three)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.four != null) {
//         queue.push(tree.four)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.five != null) {
//         queue.push(tree.five)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.six != null) {
//         queue.push(tree.six)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.seven != null) {
//         queue.push(tree.seven)
//         return searchTree(queue[0], queue)
//     }
//     if (tree.eight != null) {
//         queue.push(tree.eight)
//         return searchTree(queue[0], queue)
//     }

//     return final
// }

knightMoves([3, 3], [4, 3])
