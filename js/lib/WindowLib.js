/* MADE BY TYE */
var WindowLib = {
    Ready: false,
    WindowElements: [],
    WindowStates: [],

    // other stuff
    Mouse: {
        MovementTick: 0,
        X: 0,
        Y: 0
    }
}

//#region formatting
function IfStringEmptyReturnAs(Str, ReturnValue)
{
    try {
        if (Str.length === 0)
        {
            return ReturnValue;
        } else
        {
            return Str;
        }
    } catch (e)
    {
        return ReturnValue;
    }
}
function NoDragElement(Ele)
{
    Ele.addEventListener("dragstart", e => {
        e.preventDefault();
    })
    Ele.addEventListener("dragover", e => {
        e.dataTransfer.dropEffect = "none";
        e.preventDefault();
    })
}
//#endregion

//#region Window Element stuff
function CreateTitleBar(WindowDiv, WindowOptions)
{
    var WindowStateObject = {
        AttachedElement: WindowDiv,
        FirstClickedXPos: 0,
        FirstClickedYPos: 0,
        OGXPos: WindowOptions.StartXPos,
        OGYPos: WindowOptions.StartYPos,
        XPos: WindowOptions.StartXPos,
        YPos: WindowOptions.StartYPos,
        TitleBarHeldDown: false
    }
    var WindowStateIndex = WindowLib.WindowStates.push(WindowStateObject) - 1;
    var WindowState = WindowLib.WindowStates[WindowStateIndex];

    var TitleBarDiv = document.createElement("div");
    TitleBarDiv.className = "WindowTitleBar";

    var CloseButton = document.createElement("button");
    CloseButton.className = "WindowCloseButton";
    const appendedCloseButton = TitleBarDiv.appendChild(CloseButton);
    var MinimizeButton = document.createElement("button");
    MinimizeButton.className = "WindowMinimizeButton";
    const appendedMinimizeButton = TitleBarDiv.appendChild(MinimizeButton);

    var TitleContainer = document.createElement("div");
    TitleContainer.className = "WindowTitleContainer NoSelect";
    TitleContainer.draggable = false;
    const appendedTitleContainer = TitleBarDiv.appendChild(TitleContainer);
    var TitleText = document.createElement("span");
    TitleText.className = "WindowTitleText NoSelect";
    TitleText.innerText = WindowOptions.Title;
    TitleText.draggable = false;
    const appendedTitleText = appendedTitleContainer.appendChild(TitleText);
    //NoDragElement(appendedTitleText)

    var DragRegion = document.createElement("div");
    DragRegion.className = "WindowDragRegion";
    // drag event listeners
    DragRegion.addEventListener("mousedown", function(e)
    {
        WindowState.FirstClickedXPos = WindowLib.Mouse.X;
        WindowState.FirstClickedYPos = WindowLib.Mouse.Y;
        
        WindowState.OGXPos = WindowState.XPos;
        WindowState.OGYPos = WindowState.YPos;

        WindowState.TitleBarHeldDown = true;
    });
    document.addEventListener("mouseup", function(e)
    {
        WindowState.TitleBarHeldDown = false;
    });
    // appending drag region
    var appendedDragRegion = TitleBarDiv.appendChild(DragRegion);

    // return object, and we're done!!
    return {
        MainElement: WindowDiv.appendChild(TitleBarDiv),
        CloseButton: appendedCloseButton,
        MinimizeButton: appendedMinimizeButton,
        TitleContainer: appendedTitleContainer,
        TitleText: appendedTitleText,
        DragRegion: appendedDragRegion
    };
}
//#endregion

function WindowCreateFromElement(WinElement)
{
    var ObjectToPush = {}

    const WindowDiv = document.createElement("div");
    WindowDiv.className = "WindowLibWindow";
    // geting attributes from root element and applying them to the div
    WindowDiv.style.width = WinElement.getAttribute("width");
    WindowDiv.style.height = WinElement.getAttribute("height");

    // gets background tag (if it even exists)
    var backgroundTag = WinElement.getElementsByTagName("background")[0];
    if (backgroundTag)
    {
        WindowDiv.style.backgroundColor = backgroundTag.getAttribute("value");
    }

    // gets options
    var OptionsTag = WinElement.getElementsByTagName("options")[0];
    var WindowOptions = {
        StartXPos: 0,
        StartYPos: 0
    }
    WindowOptions.CanClose = IfStringEmptyReturnAs(OptionsTag.getAttribute("canclose"), "true");
    WindowOptions.Title = IfStringEmptyReturnAs(WinElement.getAttribute("title"), "Title");

    switch (WindowOptions.Title)
    {
        case "About":
            WindowOptions.StartXPos = Math.floor((window.innerWidth / 2) - (WinElement.getAttribute("width").split("px")[0] / 2));
            WindowDiv.style.left = `${WindowOptions.StartXPos}px`;
            break;
    }
    

    // append window div to body
    var newElement = document.body.appendChild(WindowDiv);

    // creates stuff in element
    ObjectToPush.TitleBarElement = CreateTitleBar(newElement, WindowOptions);

    ObjectToPush.MainElement = newElement;

    WindowLib.WindowElements.push(ObjectToPush);
    // delete old window element
    WinElement.remove();
}
function InitWindowLib()
{
    console.log("[WindowLib] Initializing..");

    var TempWindowElements = document.getElementsByTagName("window");
    for (const WinElement of TempWindowElements) {
        WindowCreateFromElement(WinElement);
    }

    // setup other stuff
    document.addEventListener("mousemove", function(e)
    {
        WindowLib.Mouse.X = e.clientX;
        WindowLib.Mouse.Y = e.clientY;
    })

    // "we're ready!!"
    WindowLib.Ready = true;
}

// animation frame
function WindowLibUpdateFrame()
{
    if (!WindowLib.Ready) { return; }

    // for every window state
    for (let i = 0; i < WindowLib.WindowStates.length; i++)
    {
        var State = WindowLib.WindowStates[i];
        if (State.TitleBarHeldDown)
        {
            State.XPos = WindowLib.Mouse.X + (State.OGXPos - State.FirstClickedXPos);
            State.YPos = WindowLib.Mouse.Y + (State.OGYPos - State.FirstClickedYPos);

            State.AttachedElement.style.left = `${State.XPos.toString()}px`;
            State.AttachedElement.style.top = `${State.YPos.toString()}px`;
        }
    }

    requestAnimationFrame(WindowLibUpdateFrame);
}
requestAnimationFrame(WindowLibUpdateFrame);