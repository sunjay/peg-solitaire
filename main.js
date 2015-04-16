// Main game entry point
(function($) {
    var board = new Board(BOARDS.english);
    var render_board_template = Handlebars.compile($("#board-template").html());

    function render_board() {
        $(".game-main").html(render_board_template({tiles: board.tiles}));
    }

    render_board();
    
    var selected_tile = null;
    $(document).on("click", ".board-tile.filled:not(.selected)", function() {
        var row = $(this).data('row');
        var col = $(this).data('col');
        
        $('.board .board-tile').removeClass('selected valid-move');
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

        board.moveTileTo(selected_tile[0], selected_tile[1], row, col);
        render_board();
    });
}(jQuery));

