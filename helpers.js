function is_tile_empty(tile) {
    return tile == TILES.EMPTY;
}
Handlebars.registerHelper('is_tile_empty', is_tile_empty);

function is_tile_filled(tile) {
    return tile == TILES.FILLED;
}
Handlebars.registerHelper('is_tile_filled', is_tile_filled);

function is_tile_blank(tile) {
    return tile == TILES.BLANK;
}
Handlebars.registerHelper('is_tile_blank', is_tile_blank);

Handlebars.registerHelper('tile_class_name', function(tile) {
    if (is_tile_empty(tile)) {
        return "empty";
    }
    else if (is_tile_filled(tile)) {
        return "filled";
    }
    else if (is_tile_blank(tile)) {
        return ""; // could be something in the future
    }
    // else: do nothing, invalid tile
});


