// SCRIPT PURPOSE: Provide quick utilites for other scripts

// console style variables

// character setup
const TyeSONWhitespaceSyntax = "==|";

// converts an array of 4 string numbers into a css "RGBA" string
function rgbaArrayToString(rgbaArray, verbose) {
    if (verbose) {
        console.log("QuickUtils.js, rgbaArrayToString() | Converted array to: " + (
            "rgba(" + rgbaArray[0] + ", " + rgbaArray[1] + ", " + rgbaArray[2] + ", " + rgbaArray[3] + ")"
        ));
    }
    
    return (
        "rgba(" + rgbaArray[0] + ", " + rgbaArray[1] + ", " + rgbaArray[2] + ", " + rgbaArray[3] + ")"
    );
}

//#region String Utils
function OnlyAllowChars(string, allowedStrings) {
    var returnedString = string;

    // for each allowed string in allowedStrings
    for (var allowedCharIndex = 0; allowedCharIndex < allowedStrings.length; allowedCharIndex++) {
        var character = allowedStrings[allowedCharIndex];
        var stringLen = character.length;

        var separatedString = "";
        var index = 0;
        var endReached = false;

        while (!endReached) {
            if (string.length < index * 3 + 2) { // if there's enough chars
                console.log("string is valid");
            }
            endReached = true;
        }
    }

    return returnedString;
}

function GetAllOccurencesOf(string, occurence, multiLine) {
    var occurences = [];
    var stringLen = string.length;
    if (stringLen == 0) { // in case we're searching through an empty string
        return [];
    }

    let index = string.indexOf(occurence);

    while (index !== -1) {
        // prevent out of range
        if (index + 1 >= stringLen) {
            break;
        }

        occurences.push(index);
        index = string.indexOf(occurence, index + 1);
    }

    /*if (!multiLine) {
    } else {
        var lineSplit = string.split("\n");

        for (var line = 0; line < lineSplit; line++) {
            var occurencesForLine = {};

            var indents = OnlyAllowChars(lineSplit[line], ["==|"]);
            console.log(indents);

            occurences.push(occurencesForLine);
        }
    }*/

    return occurences;
}
//#endregion

function IsString(variable)
{
    return typeof variable === "string";
}

// todo: maybe get and write the amount of indents?
function removeIndentationsFromString(string) {
    if (IsString(string)) {
        var returnedString = "";
        var lineSplit = string.split("\n");
        
        for (var line = 0; line < lineSplit.length; line++) {
            var indentOccurences = GetAllOccurencesOf(lineSplit[line], TyeSONWhitespaceSyntax, true);
            var ioLen = indentOccurences.length;

            var currentLine = lineSplit[line];
            
            lineSplit[line] = currentLine + ioLen;
            console.log("line split: " + lineSplit[line]);
        }

        // reconstructing the linesplit array
        for (var i = 0; i < lineSplit.length; i++)
        {
            if (i < lineSplit.length - 1) {
                returnedString += lineSplit[i] + "\n";
            } else if (i == lineSplit.length) {
                returnedString += lineSplit[i];
            }
        }

        var whiteSpaceSplit = returnedString.split(TyeSONWhitespaceSyntax);

        // rebuilds string
        for (var split = 0; split < whiteSpaceSplit.length; split++) {
            returnedString += whiteSpaceSplit[split];
        }

        return returnedString;
    } else {
        throw new Error(`Argument "string" is not a type of string.`);
    }
}

function parseCustomJsonString(rawString) {
    var fixedString = rawString + "";
    var returnedObject = {};

    // removes all indents
    fixedString = removeIndentationsFromString(fixedString);

    console.log(fixedString);

    var fixedStringLines = fixedString.split("\n");

    // first line is ignored because it's a squigly bracket
    for (var line = 1; line < fixedStringLines.length - 1; line++)
    {
        // checks if it's the last line and ignores if so
        if (line == fixedStringLines.length - 2) {
            break;
        }

        var apostropheSplit = fixedStringLines[line].split("'");
        var varName = apostropheSplit[1];

        console.log(varName);
    }

    return returnedObject;
}