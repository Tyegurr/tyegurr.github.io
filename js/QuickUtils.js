// SCRIPT PURPOSE: Provide quick utilites for other scripts

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