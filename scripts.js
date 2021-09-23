function rowToLines(text) {
    return text.split(",").join("\n");
};

function linesToRow(text) {
    if (text.split("\n").length == 1) {
        return text;
    }
    return text.split("\n").map(x => x.replace(',', '')).join(", ");
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


// Python Deconstructors
function deconstructFunctionArgs(text) {
    text = text.replace(/\(|\)/g, '');
    let lines = text.split(",");

    let output = [];
    for (let i=0; i < lines.length; i++){
        let arg = lines[i].split(":")[0].trim();
        let type = '';
        if (lines[i].split(":").length > 1) {
            type = lines[i].split(":")[1].trim();
        }
        
        output.push({name: arg,
                     type: type})
    }
    // TODO split on defaults
    // return JSON.stringify(output)
    return output.map(x => x.name).join("\n");
};

// Masks
function mask(text, mask) {
    let lines = text.split("\n");
    let output = [];
    for (let i = 0; i < lines.length; i++){
        output.push(mask.replace(/@/g, lines[i]));
    };
    return output.join("\n");
};