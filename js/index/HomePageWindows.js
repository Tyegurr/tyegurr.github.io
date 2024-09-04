// element vars
var GrabbableElements;
var GrabbableElements_Config = {
}

function setupGrabbables() {
    // for each grabbable element
    for (var elem = 0; elem < GrabbableElements.length; elem++) {
        GrabbableElements_Config[("elem" + elem)] = {
            grabbing: false,
            comparativeX: 0,
            comparativeY: 0,
            comparativeRect: null,
            offsetX: 0,
            offsetY: 0
        };
        // adds event listeners
        var elemChildren = GrabbableElements[elem].children;
        for (var i = 0; i < elemChildren.length; i++) {
            if (elemChildren[i].className.split(" ")[0] === "GrabWindow") {
                elemChildren[i].addEventListener("mousedown", function(e) {
                    grabbable_MouseDown(elem, ("elem" + (elem - 1)));
                });
                elemChildren[i].addEventListener("mouseup", function(e) {
                    grabbable_MouseUp(elem, ("elem" + (elem - 1)));
                });
            }
        }
    }
}

// grabbable functions
function grabbable_MouseDown(index, objName) {
    var elemIndex = parseInt(objName.split("elem")[1]);
    var elem = GrabbableElements[elemIndex];

    var config = GrabbableElements_Config[("elem" + (index - 1))];
    // sets up the config to a grabbing state
    config.grabbing = true;
    config.comparativeRect = elem.getBoundingClientRect();
    config.comparativeX = mouseX;
    config.comparativeY = mouseY;
}
function grabbable_MouseUp(index, objName) {
    var config = GrabbableElements_Config[("elem" + (index - 1))];
    // sets up the config to a non grabbing state
    config.grabbing = false;
    config.comparativeRect = null;
}

window.onload = function() {
    // gets all elements with a "windowGrabbable" attribute
    GrabbableElements = document.querySelectorAll('[windowGrabbable]');

    setupGrabbables();

    // time stamp anim frame
    requestAnimationFrame(animFrame);
}

function animFrame(timeStamp) {
    // for every grabbable element config
    for (const configProp in GrabbableElements_Config) {
        var config = GrabbableElements_Config[configProp];
        var configIndex = parseInt(configProp.split("elem")[1]);
        var elem = GrabbableElements[configIndex];

        if (config.grabbing && config.comparativeRect != null)
        {
            var mouseXOffset = (
                (config.comparativeRect.left - config.comparativeX) + mouseX
            );
            var mouseYOffset = (
                (config.comparativeRect.top - config.comparativeY) + mouseY
            );

            // moves element
            elem.style.left = mouseXOffset + "px";
            elem.style.top = mouseYOffset + "px";
        }
    }

    // put this at the end
    requestAnimationFrame(animFrame);
}