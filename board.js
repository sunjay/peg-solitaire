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

    Board.prototype.height = function() {
        return this.tiles.length;
    };

    Board.prototype.width = function() {
        return this.tiles[0].length;
    };

    Board.prototype.getValidMoves = function() {
        
    };

    Board.prototype.isMovableTile = function(row, col) {
        var tile = this.tiles[row][col];
        if (tile !== TILES.FILLED) {
            return false;
        }

        // Offsets to check in each direction
        var checks = [-2, 2];

        for (var i = 0; i < checks.length; i++) {
            var offset = checks[i];

            // vertical offset
            var i_row = row + offset;
            if (i_row >= 0 && i_row < this.height()) {
                if (this.tiles[i_row][col] === TILES.EMPTY) {
                    return true;
                }
            }

            // horizontal offset
            var i_col = col + offset;
            if (i_col >= 0 && i_col < this.width()) {
                if (this.tiles[row][i_col] === TILES.EMPTY) {
                    return true;
                }
            }
        }

        return false;
    };

    window.Board = Board;
}());
