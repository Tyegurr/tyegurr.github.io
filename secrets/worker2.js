let workers  = [];
for (let i = 0; i < 128; i++)
{
    workers.push(new Worker("worker.js"));
}