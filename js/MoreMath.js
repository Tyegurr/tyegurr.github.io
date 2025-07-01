var MoreMath = {}

MoreMath.Lerp = function(a, b, t) {
    return a + (b - a) * t;
}
MoreMath.deltaTime = 0;

(function() {
    // calculating delta time
    let lastTime = 0;

    function OnFrame(timestamp)
    {
        if (lastTime === 0) // first frame handling
        {
            lastTime = timestamp;
        }

        MoreMath.deltaTime =  (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        requestAnimationFrame(OnFrame);
    }
    requestAnimationFrame(OnFrame);
}());