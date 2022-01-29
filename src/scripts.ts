function rowToLines(text: string): string {
    return text.split(",").join("\n");
};

function linesToRow(text: string): string {
    if (text.split("\n").length == 1) {
        return text;
    }
    return text.split("\n").map(x => x.replace(',', '')).join(", ");
};

function linesEqualSelf(text: string): string {
    return text.split("\n").map(x => x + '=' + x).join("\n");
};

function linesPrefix(text: string, prefix=''): string {
    return text.split("\n").map(x => prefix + x).join("\n");
};

function linesSuffix(text: string, suffix=''): string {
    return text.split("\n").map(x => x + suffix).join("\n");
};

function linesZip(text: string, delim=''): string {
    let clean = [];
    let lines = text.split("\n");
    let mid = Math.floor(lines.length / 2);
    for (let i = 0; i < mid; i++){
        clean.push(lines[i] + delim + lines[mid + i]);
    }
    return clean.join("\n");
};

function linesTrim(text: string): string { return text.split("\n").map(x => x.trim()).join("\n")};

function linesToSelfAttributes(text: string): string {return text.split("\n").map(x => `self.${x} = ${x}`).join("\n")};

function linesToPythonLiteralList(text: string): string {return '[' + text.split("\n").map(x => `"${x}"`).join(",\n") + ']'};

function linesToPythonLiteralTuple(text: string): string {return linesToPythonLiteralList(text).replace('[', '(').replace(']', ')')};

// Cases
function upperCase(text: string): string {return text.toUpperCase()};
function lowerCase(text: string): string {return text.toLowerCase()};


// Python Deconstructors
function deconstructFunctionArgs(text: string): string {
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
function mask(text: string, mask: string): string {
    let lines = text.split("\n");
    let output = [];
    for (let i = 0; i < lines.length; i++){
        output.push(mask.replace(/@/g, lines[i]));
    };
    return output.join("\n");
};