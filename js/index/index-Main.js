// mouse
var mouseX = 0;
var mouseY = 0;
var mousedown = false;

// mouse events
document.addEventListener("mousemove", function(e) {
    mouseX = e.screenX;
    mouseY = e.screenY;
});
document.addEventListener("mousedown", function(e) {
    mousedown = true;
});
document.addEventListener("mouseup", function(e) {
    mousedown = false;
});

var DebugVars = {
    lastLoop: new Date(),
    FPS: 0,
    DeltaTime: 0
}

// elements
var DebugElements = {
    debugMenuOpen: false,
    debuggingMenu: null,
    deltaTimeDisplay: null,
    fpsDisplay: null
}

// init
function InitMain() {
    console.log("index-Main.js, InitMain() | Initialized.");

    // sets up elements: debug
    DebugElements.debuggingMenu = document.getElementById("debuggingMenu");

    // initializes other stuff
    Stuffs_OnLoad();
}

window.onload = InitMain();

// request animation frame. Ran when page is loaded.
function AnimFrame(timeStamp) {
    // getting important animFrame vars
    var thisLoop = new Date();
    DebugVars.FPS = 1000 / (thisLoop - DebugVars.lastLoop);
    DebugVars.DeltaTime = 0.1 / (thisLoop - DebugVars.lastLoop);
    DebugVars.lastLoop = thisLoop

    // debug stuff

    requestAnimationFrame(AnimFrame); // loops
}