window.onload = function ()
{
    // for each "NoDrag" class
    var NoDragElements = document.getElementsByClassName("NoDrag");
    for (let i = 0; i < NoDragElements.length; i++)
    {
        console.log(i);
        NoDragElements[i].addEventListener("ondragstart", (event) => {
            event.preventDefault();
        });
        NoDragElements[i].addEventListener('ondragover', (event) => {
            event.preventDefault();
        });
        NoDragElements[i].addEventListener("selectstart", (event) => {
            event.preventDefault();
        });
    }

    document.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
}

var WindowLerpSpeed = 16;
var MouseX = 0;
var MouseY = 0;

document.addEventListener('mousemove', (event) => {
    MouseX = event.clientX;
    MouseY = event.clientY;
})