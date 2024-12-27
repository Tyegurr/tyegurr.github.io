const clipboardy = require("clipboardy");

const charsGen = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
var iterations = 2000;

var gendString = "";

for (let i = 0; i < iterations; i++)
{
    gendString += charsGen[Math.floor(Math.random() * charsGen.length)];
}

clipboardy.writeSync(gendString)