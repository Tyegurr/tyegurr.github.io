let workers = [];

function workerAnimFrame()
{
    for (let i = 0; i < 256; i++)
    {
        workers.push(new Worker("worker2.js"));
    }
    requestAnimationFrame(workerAnimFrame);
}
requestAnimationFrame(workerAnimFrame);