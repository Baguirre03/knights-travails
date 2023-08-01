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
    constructor(data) {
        this.data = data
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
    let start = { name: 'root', array: game.board[root] }

    let final = buildTree(start, game.board, pieceEnd)

    console.log(final)
    if (!final.prev) {
        return final
    }
    return Array(...final.prev, final.data)
}

function buildTree(array, board, end, queue = ['fill']) {
    if (!queue.length) {
        return
    }
    queue.splice(0, 1)

    let root = new Node(array.array)
    if (root == null) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, queue)
    }

    let options = {
        one: { name: 'one', array: [array.array[0] + 1, array.array[1] + 2], parent: root },
        two: { name: 'two', array: [array.array[0] + 2, array.array[1] + 1], parent: root },
        three: { name: 'three', array: [array.array[0] + 2, array.array[1] - 1], parent: root },
        four: { name: 'four', array: [array.array[0] + 1, array.array[1] - 2], parent: root },
        five: { name: 'five', array: [array.array[0] - 1, array.array[1] - 2], parent: root },
        six: { name: 'six', array: [array.array[0] - 2, array.array[1] - 1], parent: root },
        seven: { name: 'seven', array: [array.array[0] - 2, array.array[1] + 1], parent: root },
        eight: { name: 'eight', array: [array.array[0] - 1, array.array[1] + 2], parent: root }
    }

    if (!array.parent) {
        if (array.array[0] == end[0] && array.array[1] == end[1]) {
            return root
        }
        queue.push(options.one, options.two, options.three, options.four, options.five, options.six, options.seven, options.eight)
        return buildTree(queue[0], board, end, queue)
    }

    let index = findIndexOfStart(array.array, board)
    if (index == false) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, queue)
    }

    if (array.array[0] * array.array[1] > 64) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, queue)
    } else if (array.array[0] * array.array[1] < 1) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, queue)
    }

    if (array.parent.prev) {
        let a = array.parent.prev
        let b = root.data
        for (let i = 0; i < a.length; i++) {
            if (a[i][0] === b[0] && a[i][1] === b[1]) {
                // queue.splice(1)
                return buildTree(queue[0], board, end, queue)
            }
        }
    }

    if (array.array[0] == end[0] && array.array[1] == end[1]) {
        if (array.parent.prev) {
            root.prev = Array(...array.parent.prev, array.parent.data)
        } else {
            root.prev = [array.parent.data]
        }
        array.parent[array.name] = root
        queue.splice(1)
        return root
    }

    if (array.parent) {
        if (array.parent.prev) {
            root.prev = Array(...array.parent.prev, array.parent.data)
        } else {
            root.prev = [array.parent.data]
        }
        array.parent[array.name] = root
    }


    queue.push(options.one, options.two, options.three, options.four, options.five, options.six, options.seven, options.eight)
    return buildTree(queue[0], board, end, queue)
}

// console.log(knightMoves([1, 1], [2, 3]))
// console.log(knightMoves([1, 1], [4, 4]))
// console.log(knightMoves([3, 3], [4, 3]))
console.log(knightMoves([1, 8], [8, 1]))

