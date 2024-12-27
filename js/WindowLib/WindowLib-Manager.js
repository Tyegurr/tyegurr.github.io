var LoadedWindows = {
}

function CreateWindowFromElement(elem) {
    var windowDiv = document.createElement("div");
    windowDiv.style = `
    position: absolute;
    z-index: 10;
    width: ${elem.getAttribute("width")};
    height: ${elem.getAttribute("height")};
    background-color: ${elem.getAttribute("backgroundColor")};
    left: ${elem.getAttribute("xPos")};
    top: ${elem.getAttribute("yPos")};

    border: ${elem.getAttribute("borderSize")} solid ${elem.getAttribute("borderColor")};
    border-radius: 2vh;
    `;

    // top navigation bar
    var TopNavBar = document.createElement("div");
    TopNavBar.style = `
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 50px;
    background-color: rgba(50, 50, 50, 0);
    `;

    var TitleBar = document.createElement("p");
    TitleBar.style = `
    position: absolute;
    z-index: 1;
    width: calc(100% - 157px);
    height: 50px;
    background-color: rgba(80, 80, 80, 0);
    color: rgb(255, 255, 255);
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    font-size: 50px;
    top: -50px;
    left: 7px;
    `;
    TitleBar.innerText = elem.getAttribute("titleBarName");
    TopNavBar.appendChild(TitleBar);

    windowDiv.appendChild(TopNavBar);

    // finds children of "elem" and adds them into the created div
    for (const child of elem.children) {
        windowDiv.appendChild(child);
    }
    
    // appends to body
    document.body.appendChild(windowDiv);
}

function onLoad() {
    console.log("WindowLib-Manager: loaded.");
    var foundWindows = document.body.getElementsByTagName("window");
    CreateWindowFromElement(foundWindows[0]);
}

window.addEventListener("load", onLoad)