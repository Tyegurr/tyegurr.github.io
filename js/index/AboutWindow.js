(function()
{
    var DraggingWindow = false;

    var WindowX = (window.innerWidth / 2) - 300;
    var WindowTargetX = (window.innerWidth / 2) - 300;
    var WindowY = (window.innerHeight / 2) - 150 - 40;
    var WindowTargetY = (window.innerHeight / 2) - 150 - 40;

    var XPosOnDrag = 0;
    var MouseXOnDrag = 0;
    var YPosOnDrag = 0;
    var MouseYOnDrag = 0;

    var AboutWindow = document.getElementById("aboutWindow");
    AboutWindow.style.left = `calc(${WindowX}px)`;
    AboutWindow.style.top = `calc(${WindowY}px)`;

    var AboutWindowDragArea = document.getElementById("aboutWindowDragArea");
    AboutWindowDragArea.addEventListener('mousedown', (event) => {
        DraggingWindow = true;
        XPosOnDrag = WindowX;
        MouseXOnDrag = MouseX;
        YPosOnDrag = WindowY;
        MouseYOnDrag = MouseY;
    });
    document.addEventListener('mouseup', (event) => {
        DraggingWindow = false;
    });

    function AnimFrame() {
        if (DraggingWindow)
        {
            WindowTargetX = XPosOnDrag - (MouseXOnDrag - MouseX);
            WindowTargetY = YPosOnDrag - (MouseYOnDrag - MouseY);
        }

        WindowX = MoreMath.Lerp(WindowX, WindowTargetX, MoreMath.deltaTime * WindowLerpSpeed);
        WindowY = MoreMath.Lerp(WindowY, WindowTargetY, MoreMath.deltaTime * WindowLerpSpeed);
        AboutWindow.style.left = `${WindowX}px`;
        AboutWindow.style.top = `${WindowY}px`;

        requestAnimationFrame(AnimFrame);
    }

    requestAnimationFrame(AnimFrame)
}());