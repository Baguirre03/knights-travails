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
        // this.one = null
        // this.two = null
        // this.three = null
        // this.four = null
        // this.five = null
        // this.six = null
        // this.seven = null
        // this.eight = null
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
    let tree = buildTree(start, game.board, pieceEnd,)
    console.log(tree)
    // let final = searchTree(tree)
    // console.log(final)
}

// function addChildNode(name, data, parent) {
//     let newNode = new Node(data)
//     parent[name] = newNode
//     return newNode
// }

function buildTree(array, board, end, visited = [], queue = ['fill']) {
    if (!queue.length) {
        return
    }
    queue.splice(0, 1)

    let root = new Node(array.array)
    if (root == null) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, visited, queue)
    }

    let index = findIndexOfStart(array.array, board)
    if (index == false) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, visited, queue)
    }

    if (array.array[0] == end[0] && array.array[1] == end[1]) {
        array.parent[array.name] = root
        return buildTree(queue[0], board, end, visited, queue)
    }

    if (visited.includes(index)) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, visited, queue)
    }
    visited.push(index)

    if (array.array[0] * array.array[1] > 64) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, visited, queue)
    }
    if (array.array[0] * array.array[1] < 1) {
        array.parent[array.name] = null
        return buildTree(queue[0], board, end, visited, queue)
    }

    if (array.parent) {
        array.parent[array.name] = root
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

    queue.push(options.one, options.two, options.three, options.four, options.five, options.six, options.seven, options.eight)
    buildTree(queue[0], board, end, visited, queue)
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
