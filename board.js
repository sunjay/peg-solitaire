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

    Board.prototype.copy = function() {
        var tiles_copy = [];
        this.tiles.forEach(function(row) {
            tiles_copy.push(row.slice());
        });
        return new Board(tiles_copy);
    }

    Board.prototype.height = function() {
        return this.tiles.length;
    };

    Board.prototype.width = function() {
        return this.tiles[0].length;
    };

    Board.prototype.getTilesBetween = function(row, col, dest_row, dest_col) {
        // For the two tiles to be orthogonal, either the rows or columns must be the same
        if (row !== dest_row && col !== dest_col) {
            throw new Error("Tiles must be orthogonal");
        }

        var tiles = [];

        // Only one of these loops should actually run 

        for (var i_row = Math.min(row, dest_row) + 1, d_row = Math.max(row, dest_row); i_row < d_row; i_row++) {
            tiles.push([i_row, col]);
        }

        for (var i_col = Math.min(col, dest_col) + 1, d_col = Math.max(col, dest_col); i_col < d_col; i_col++) {
            tiles.push([row, i_col]);
        }
        
        return tiles;
    };

    Board.prototype.isFilledBetween = function(row, col, dest_row, dest_col) {
        // Returns true if all tiles between (but not including either provided coordinates) are filled
        var is_filled = true;
        this.getTilesBetween(row, col, dest_row, dest_col).forEach(function(tile) {
            var tile_row = tile[0];
            var tile_col = tile[1];

            if (this.tiles[tile_row][tile_col] !== TILES.FILLED) {
                is_filled = false;
                return false;
            }
        }.bind(this));

        return is_filled;
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
                if (this.tiles[i_row][col] === TILES.EMPTY && this.isFilledBetween(row, col, i_row, col)) {
                    move_tiles.push([i_row, col]);
                }
            }

            // horizontal offset
            var i_col = col + offset;
            if (i_col >= 0 && i_col < this.width()) {
                if (this.tiles[row][i_col] === TILES.EMPTY && this.isFilledBetween(row, col, row, i_col)) {
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

        // Note that this code does not explicitly enforce the "only one tile" between rule of peg solitaire. That responsibility is left up to the view layer. The view layer should respect the getMovesAroundTile() function.

        // Move the peg out of where it is now
        this.tiles[row][col] = TILES.EMPTY;

        this.getTilesBetween(row, col, dest_row, dest_col).forEach(function(tile) {
            var tile_row = tile[0];
            var tile_col = tile[1];

            // This guard ensures that BLANK tiles are not accidentally changed (though this should never happen)
            if (this.tiles[tile_row][tile_col] === TILES.FILLED) {
                this.tiles[tile_row][tile_col] = TILES.EMPTY;
            }
        }.bind(this));

        // Fill in the destination tile
        this.tiles[dest_row][dest_col] = TILES.FILLED;
    };

    window.Board = Board;
}());
