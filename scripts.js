function rowToLines(text) {
    return text.split(",").join("\n");
};


function linesToRow(text) {
    return text.split("\n").join(",");
};

function linesEqualSelf(text) {
    return text.split("\n").map(x => x + '=' + x).join("\n");
};
