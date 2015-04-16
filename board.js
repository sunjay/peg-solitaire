(function() {
    window.TILES = {};
    // A tile that does not exist on the board (is rendered blank)
    TILES.BLANK = 2;
    // A tile that is filled with a peg
    TILES.FILLED = 4;
    // A tile that is not filled with a peg but still exists as a valid spot to place something
    TILES.EMPTY = 8;

    window.BOARDS = {
        english: [
            [TILES.BLANK, TILES.BLANK, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.BLANK, TILES.BLANK],
            [TILES.BLANK, TILES.BLANK, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.BLANK, TILES.BLANK],
            [TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED],
            [TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.EMPTY, TILES.FILLED, TILES.FILLED, TILES.FILLED],
            [TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.FILLED],
            [TILES.BLANK, TILES.BLANK, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.BLANK, TILES.BLANK],
            [TILES.BLANK, TILES.BLANK, TILES.FILLED, TILES.FILLED, TILES.FILLED, TILES.BLANK, TILES.BLANK]
        ]
    };

    function Board(initial_board) {
        if (!initial_board) {
            throw new Error("Board must be created with a 2D array that represents its initial state");
        }

        this.tiles = initial_board;
    }

    Board.prototype.getValidMoves = function() {
        
    }

    window.Board = Board;
}());
