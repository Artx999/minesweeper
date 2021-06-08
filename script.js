class Square {
    /**
     * @param {Array.<int>} coords - The x-coordinate of the square
     * @param {boolean} isBomb - Whether or not the square is a bomb
     */
    constructor(coords, isBomb) {
        this.coords = coords
        this.isBomb = isBomb
    }
}
class Board {
    constructor() {
        this.squaresList = []
    }
    /**
     * @param {int} difficulty
     */
    create(difficulty) {
        console.log("Creating board...")
        // Checking if the difficulty is valid
        if (!Number.isInteger(difficulty)) throw new Error("Difficulty not set to int")
        let minDifficulty = 0, maxDifficulty = 2
        if (difficulty < minDifficulty || difficulty > maxDifficulty) throw new Error("Difficulty must be between " + minDifficulty + " and " + maxDifficulty)

        this.difficulty = difficulty
        let size = (this.difficulty + 1) * 5
        let bombAmount = (this.difficulty + 1) * 10

        // Get bombs cords
        this.bombsCoords = []
        for (let i = 0; i < bombAmount; i++) {
            let newBomb = [randomIntFromInterval(0, size), randomIntFromInterval(0, size)]
            if (!JSON.stringify(this.bombsCoords).includes(JSON.stringify(newBomb))) this.bombsCoords.push(newBomb)
            else i--
        }

        // Generate squares
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let coords = [x, y]
                let isBomb = false
                isBomb = JSON.stringify(this.bombsCoords).includes(JSON.stringify(coords));
                this.squaresList.push(new Square(coords, isBomb))
            }
        }
        console.log("Created board")
    }
}
/*

class Game {
    constructor() {
    }
    start() {
        let board = new Board()
        board.create(0)
        console.log("Game started!")
    }
}

// What to run
game = new Game()
game.start()

 */
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let board = new Board()
board.create(1)
console.log(board)