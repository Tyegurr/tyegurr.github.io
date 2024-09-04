/*
    WindowLib.js:
    turns a custom element into a stylized, grabbable window.
*/

// an array that lists the active window elements on the page.
var ActiveWindowElements = []

/* windowInfo example:
    INFO FOR: "windowControlFunctionality":
        A Boolean array for functionalities "Minimize", "Restore/Maximize", and "Close".
        If one is true, that makes that specific feature work. (if it's even added in yet by me, XD)

    windowControlFunctionality: [false, false, false]
    title: "Default Window",    (!!) The title of the window
    windowId: "DefaultWindow",  (!!) The ID of the window for identifying
    position: "absolute",   (!!) self explanitory property
    zIndex: 1,  (!!) self explanitory property
    parentElement: document.body,  (!!) The parent element of the window.
    (STYLING)
    titleBarFontColor = [255, 255, 255, 1],
    titleBarFont: "monospace",
    titleBarFontSize: "0",
    titleBarColor: [0, 0, 0, 1],
    contentBGColor: [50, 50, 50, 1],
    (BASE WINDOW)
    baseWindowWidth: "0",   (!!) Strings for CSS values
    baseWindowHeight: "0",
    baseWindowLeft: "0",
    baseWindowTop: "0",
    baseWindowBorderRadius: "0",
    controlBarHeight: "5vh"     (!!) The height of the control bar (the bar with the window controls)
*/

// sets up a window
function SetupWindow(windowInfo) {
    console.log("WindowLib.js, SetupWindow() | Creating window with ID '" + windowInfo.windowId + "'.");

    // defines element
    var windowElement = document.createElement("div");
    // <!!> styling our windowElement <!!> //
    windowElement.style.borderRadius = windowInfo.baseWindowBorderRadius;
    windowElement.style.backgroundColor = rgbaArrayToString(windowInfo.titleBarColor, false);
    windowElement.style.position = windowInfo.position;
    windowElement.style.zIndex = windowInfo.zIndex;
    // width, height, left, and top
    windowElement.style.width = windowInfo.baseWindowWidth;
    windowElement.style.height = windowInfo.baseWindowHeight;
    windowElement.style.left = windowInfo.baseWindowLeft;
    windowElement.style.top = windowInfo.baseWindowTop;

    // <!!> title text <!!> //
    var titleText = document.createElement("p");
    titleText.innerText = windowInfo.title;
    titleText.style = (
        "position: absolute;\nz-index: 8;\n"+
        "background-color: rgb(0, 0, 0);\n" + 
        // FONT SETUP
        ("font-family: " + windowInfo.titleBarFont + ";\n") +
        ("color: " + rgbaArrayToString(windowInfo.titleBarFontColor, false) + ";\n") +
        ("font-size: calc(" + windowInfo.titleBarFontSize + " - 0.3vh" + ");\n") +
        // position and size (x and y)
        ("width: calc(" + windowInfo.baseWindowWidth + " - 50%);\n") +
        ("height: calc(" + windowInfo.titleBarFontSize + " - 0.3vh);") +
        "left: 0.7vh;\n" +
        "top: -2.3vh;"
    );

    // <?Q?> WINDOW CONTROLS <?Q?>
    // <!!> CLOSE BUTTON <!!>
    var CloseButton = document.createElement("button");
    if (windowInfo.windowControlFunctionality[2] == true) // if the button does have functionality
    {
        CloseButton.id = "windowLibCloseBTN";
    }
    CloseButton.innerText = "X"; // the ultimately necessary character (for our close button)
    // stylizing the close button
    CloseButton.className = "CloseButton"; // sets the button's class to setup stuff
    CloseButton.style += (
        ("\nfont-family: " + windowInfo.titleBarFont + ";")
    );

    // <!!> window content div <!!> //
    var windowContent = document.createElement("div");
    windowContent.style = (
        "position: absolute;\n" +
        "z-index: 2;\n" +
        "width: 100%;\n" +
        ("height: calc(" + windowInfo.baseWindowHeight + " - " + windowInfo.controlBarHeight +");\n") +
        ("top: " + windowInfo.controlBarHeight + ";\n") +
        ("background-color: " + rgbaArrayToString(windowInfo.contentBGColor, false) + ";")
    );

    /* now, we always save the best and most vital lines for last! */
    // <!!> appending stuff <!!> //
    // window controls
    windowElement.appendChild(CloseButton);
    //
    windowElement.appendChild(titleText);
    windowElement.appendChild(windowContent);
    // assume that the parentElement is a valid element. If not, catch and return an exception.
    try {
        windowInfo.parentElement.appendChild(windowElement);
    } catch (error) {
        console.error("WindowLib.js, SetupWindow | An error occured when appending the window to the parent element.\nError: " + error +
            "\n\nSupplied value for 'windowInfo.parentElement: " + toString(windowInfo.parentElement) + "."
        );
    }
    // returning our main window div and content div
    return [
        // <!!> regular stuff <!!> //
        windowElement,
        windowContent,
        titleText,
        // <!!> window controls <!!> //
        //MinimizeButton,
        //RestoreMaximizeButton,
        CloseButton
    ];
}