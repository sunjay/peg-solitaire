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

    Board.prototype.getMovesAroundTile = function(row, col) {
        var tile = this.tiles[row][col];
        if (tile !== TILES.FILLED) {
            return [];
        }

        var move_tiles = [];

        // Offsets to check in each direction
        var checks = [-2, 2];

        for (var i = 0; i < checks.length; i++) {
            var offset = checks[i];

            // vertical offset
            var i_row = row + offset;
            if (i_row >= 0 && i_row < this.height()) {
                if (this.tiles[i_row][col] === TILES.EMPTY) {
                    move_tiles.push([i_row, col]);
                }
            }

            // horizontal offset
            var i_col = col + offset;
            if (i_col >= 0 && i_col < this.width()) {
                if (this.tiles[row][i_col] === TILES.EMPTY) {
                    move_tiles.push([row, i_col]);
                }
            }
        }

        return move_tiles;
    };

    Board.prototype.isMovableTile = function(row, col) {
        return !!(this.getMovesAroundTile(row, col).length);
    };

    Board.prototype.moveTileTo = function(row, col, dest_row, dest_col) {
        if (this.tiles[row][col] !== TILES.FILLED) {
            throw new Error("Cannot move tile if it is not there!");
        }

        if (this.tiles[dest_row][dest_col] !== TILES.EMPTY) {
            throw new Error("Cannot place tile on space that is not empty");
        }
        
        // For the two tiles to be orthogonal, either the rows or columns must be the same
        if (row !== dest_row && col !== dest_col) {
            throw new Error("Tiles must be orthogonal");
        }

        // Note that this code does not explicitly enforce the "only one tile" between rule of peg solitaire. That responsibility is left up to the view layer
        
        // Only one of these loops should actually run an interation
        for (var i_row = Math.min(row, dest_row), d_row = Math.max(row, dest_row); i_row < d_row; i_row++) {
            // This guard ensures that BLANK tiles are not accidentally changed (though this should never happen)
            if (this.tiles[i_row][col] === TILES.FILLED) {
                this.tiles[i_row][col] = TILES.EMPTY;
            }
        }

        for (var i_col = Math.min(col, dest_col), d_col = Math.max(col, dest_col); i_col < d_col; i_col++) {
            // This guard ensures that BLANK tiles are not accidentally changed (though this should never happen)
            if (this.tiles[row][i_col] === TILES.FILLED) {
                this.tiles[row][i_col] = TILES.EMPTY;
            }
        }

        // Fill in the destination tile
        this.tiles[dest_row][dest_col] = TILES.FILLED;
    }

    window.Board = Board;
}());
