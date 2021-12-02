const redis = require("redis");
const keys = require("./keys");

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) {
        return 1;
    }

    return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
    console.log("got message: " + message);
    const fibo = fib(parseInt(message));
    console.log(`fibonacci for number ${message} is ${fibo}`)
    redisClient.hset("values", message, fibo);
})

sub.subscribe("insert");