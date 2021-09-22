function rowToLines(text) {
    return text.split(",").join("\n");
};

function linesToRow(text) {
    return text.split("\n").join(",");
};

function linesEqualSelf(text) {
    return text.split("\n").map(x => x + '=' + x).join("\n");
};

function linesPrefix(text, prefix='') {
    return text.split("\n").map(x => prefix + x).join("\n");
};

function linesSuffix(text, suffix='') {
    return text.split("\n").map(x => x + suffix).join("\n");
};

function linesZip(text, delim='') {
    let clean = [];
    let lines = text.split("\n");
    let mid = Math.floor(lines.length / 2);
    for (let i = 0; i < mid; i++){
        clean.push(lines[i] + delim + lines[mid + i]);
    }
    return clean.join("\n");
};

function linesTrim(text) { return text.split("\n").map(x => x.trim()).join("\n")};

function linesToSelfAttributes(text) {return text.split("\n").map(x => `self.${x} = ${x}`).join("\n")};

function linesToPythonLiteralList(text) {return '[' + text.split("\n").map(x => `"${x}"`).join(",\n") + ']'};

function linesToPythonLiteralTuple(text) {return linesToPythonLiteralList(text).replace('[', '(').replace(']', ')')};

// Cases
function upperCase(text) {return text.toUpperCase()};
function lowerCase(text) {return text.toLowerCase()};
