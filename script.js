class Square {
    /**
     * @param {Array.<int>} coords - The x-coordinate of the square
     * @param {boolean} isBomb - Whether or not the square is a bomb
     * @param {boolean} flagged - Whether or not the square is flagged
     */
    constructor(coords, isBomb, flagged = false) {
        this.coords = coords
        this.isBomb = isBomb
        this.flagged = flagged
    }
    click(bombsCoords, htmlItem) {
        console.log(this.coords + " " + this.isBomb)

        // Checks if itself is a bomb
        if (this.isBomb) {
            document.write("DEAD!")
        }

        // Checks how many nearby squares are bombs
        let coords = this.coords
        let closeBombs = 0
        // !!! Needs more work !!!
        bombsCoords.forEach(function (item) {
            if ((item[0] === coords[0] || item[0] === coords[0] + 1 ||item[0] === coords[0] - 1) && (item[1] === coords[1] || item[1] === coords[1] + 1 ||item[1] === coords[1] - 1)) closeBombs++
        })
        if (closeBombs) $(htmlItem).html(closeBombs)
        else $(htmlItem).html(0)
    }
    flag(htmlItem) {
        switch (this.flagged) {
            case false:
                $(htmlItem).addClass("flagged")
                this.flagged = true
                break
            case true:
                $(htmlItem).removeClass("flagged")
                this.flagged = false
                break
        }
    }
}
class Board {
    constructor() {
        this.squaresList = []
    }
    /**
     * @param {int} difficulty
     * @param {int} bombAmount
     */
    create(difficulty, bombAmount) {
        console.log("Creating board...")
        // Checking if the difficulty and bombAmount is valid
        if (!Number.isInteger(difficulty)) throw new Error("Difficulty not set to int or undefined")
        let minDifficulty = 0, maxDifficulty = 2
        if (difficulty < minDifficulty || difficulty > maxDifficulty) throw new Error("Difficulty must be between " + minDifficulty + " and " + maxDifficulty)
        if (!Number.isInteger(bombAmount)) throw new Error("Amount of bombs not set to int or undefined")

        // Defines board size
        this.difficulty = difficulty
        let xSize = (this.difficulty + 1) * 5
        let ySize = (this.difficulty + 1) * 5

        // Get bombs cords
        this.bombsCoords = []
        for (let i = 0; i < bombAmount; i++) {
            let newBomb = [randomIntFromInterval(0, xSize - 1), randomIntFromInterval(0, ySize - 1)]
            if (!JSON.stringify(this.bombsCoords).includes(JSON.stringify(newBomb))) this.bombsCoords.push(newBomb)
            else i--
        }

        // Generate squares
        for (let x = 0; x < xSize; x++) {
            for (let y = 0; y < ySize; y++) {
                let coords = [x, y]
                let isBomb = false
                isBomb = JSON.stringify(this.bombsCoords).includes(JSON.stringify(coords));
                this.squaresList.push(new Square(coords, isBomb))
            }
        }

        // Generate the visual board
        let board = $("#board")
        let bombsCoords = this.bombsCoords
        board.css('--grid-rows', xSize);
        board.css('--grid-cols', ySize);
        this.squaresList.forEach(function (item) {
            let square = $("<div></div>")
                .addClass("square")
                .html(JSON.stringify(item.coords + " " + item.isBomb))
                .mousedown(function (e) {
                    switch (e.which) {
                        case 1:
                            item.click(bombsCoords, this)
                            break
                        case 2:
                            item.flag(this)
                    }
                })
            board.append(square)
        })
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
board.create(1, 30)
console.log(board)