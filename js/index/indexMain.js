const mobilePlatforms = ["iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone", "webOS", "Android"];

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

    // check if mobile
    if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPod"))
    {
        console.log("mobile");
    } else {
        console.log("not mobile");
    }
}

var WindowLerpSpeed = 16;
var MouseX = 0;
var MouseY = 0;

document.addEventListener('mousemove', (event) => {
    MouseX = event.clientX;
    MouseY = event.clientY;
})