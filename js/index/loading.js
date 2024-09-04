// on loaded function
function loading_Init()
{
    // sets up element variables
    var loadingDiv = document.getElementById("PageLoadingBlock");
    var loadingDiv_LoadingText = document.getElementById("PLB_LoadingText");
    var loadingDiv_ResRecomText = document.getElementById("PLB_ResRecomText");

    document.body.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
    // class setup
    var noRightClickElems = document.getElementsByClassName("noRightClick");
    for (var i = 0; i < noRightClickElems.length; i++) {
        noRightClickElems[i].addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });
    }

    console.log("loading.js, window.onload | Page loaded.");
    // fade anim
    // loading div
    loadingDiv.style.animationName = "loadingFade";
    loadingDiv.style.animationFillMode = "forwards";
    loadingDiv.style.animationDelay = "0.4s";
    loadingDiv.style.animationDuration = "1s";
    // loading div loading text
    loadingDiv_LoadingText.style.animationName = "loadingTextFade";
    loadingDiv_LoadingText.style.animationDuration = "1s";
    loadingDiv_LoadingText.style.animationFillMode = "forwards";
    loadingDiv_LoadingText.style.animationDelay = "0.4s";
    // loading div res recommendation text
    loadingDiv_ResRecomText.style.animationName = "loadingTextFade_RR";
    loadingDiv_ResRecomText.style.animationDuration = "1s";
    loadingDiv_ResRecomText.style.animationFillMode = "forwards";
    loadingDiv_ResRecomText.style.animationDelay = "0.6s";
}
window.addEventListener("load", loading_Init);