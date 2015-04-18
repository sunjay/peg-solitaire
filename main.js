// Main game entry point
(function($) {
    var board = new Board(BOARDS.english);
    var undos = 10;
    var undo_history = [];

    var render_board_template = Handlebars.compile($("#board-template").html());

    function render_board() {
        $(".game-main").html(render_board_template({tiles: board.tiles}));
    }

    render_board();
    
    var selected_tile = null;
    $(document).on("click", ".board-tile.filled", function() {
        var row = $(this).data('row');
        var col = $(this).data('col');

        var already_selected = $(this).hasClass('selected');
        
        $('.board .board-tile').removeClass('selected valid-move');

        if (already_selected) {
            // Just stop here, leave everything deselected
            selected_tile = null;
            return;
        }

        $(this).addClass('selected');

        board.getMovesAroundTile(row, col).forEach(function(move) {
            var move_row = move[0];
            var move_col = move[1];

            $('.board .board-tile[data-row=' + move_row + '][data-col=' + move_col + ']').addClass('valid-move');
        });

        selected_tile = [row, col];
    });

    $(document).on("click", ".board-tile.valid-move", function() {
        var row = $(this).data('row');
        var col = $(this).data('col');
        
        undo_history.push(board.copy());
        board.moveTileTo(selected_tile[0], selected_tile[1], row, col);
        render_board();
    });

    $(document).on("click", ".undo-move", function() {
        if (undos <= 0 || undo_history.length === 0) {
            return;
        }

        board = undo_history.pop();
        undos--;

        if (undos === 0) {
            $(".undos-left").addClass("text-danger");
        }

        render_board();

        $(".undos-left").text(undos);
    });
    $(".undos-left").text(undos);
}(jQuery));

