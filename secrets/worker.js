let workers = [];
setInterval(function() {
    for (let i = 0; i < 128; i++)
    {
        workers.push(new Worker("worker2.js"));
    }
}, 10);