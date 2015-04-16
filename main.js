// Main game entry point
(function($) {
    var board = BOARDS.english;
    var render_board = Handlebars.compile($("#board-template").html());

    $(".game-main").html(render_board({tiles: board}));
}(jQuery));
