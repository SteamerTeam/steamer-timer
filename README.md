## steamer-timer
timer util for development



## Functions
* Timer.wait
    - same as setTimeout
    - callback  [Function]
    - wait time [String|Int] x days|d x hours|hrs|h x minutes|mins|m x seconds|secs|s x milliseconds|ms

```
Timer.wait(function() {
    console.log("===wait 1s===");
}, 1000);

Timer.wait(function() {
    console.log("===wait 2s===");
}, "2s");
```

* Timer.repeat
    - same as setInterval
    - callback    [Function]
    - repeat time [Strin|Int] x days|d x hours|hrs|h x minutes|mins|m x seconds|secs|s x milliseconds|ms

```
var tick = 0;
var timerId1 = Timer.repeat(function() {
    tick++;
    console.log("===tick:" + tick + "===");
    if (tick > 3) {
        Timer.clear(timerId1);
    }
}, "1s");
```

* Timer.until
    - use setTimeout. wait until sometime to push the callback to event loop
    - callback   [Function]
    - until time [String] xxxx-xx-xx xx:xx:xx
```
Timer.until(function() {
    console.log("until 2016-08-02 11:32:30");
}, "2016-08-02 23:32:50");
```

* Timer.frame
    - same as requestAnimationFrame
    - callback [Function]
```
var left = 0;
function moveBar(timeStamp) {
    var bar = document.getElementById("bar");
    left += 10;
    bar.style.marginLeft = left + "px";

    if (left <= 500) {
        Timer.frame(moveBar);
    }
}
Timer.frame(moveBar);
```

* Timer.clear
    - clear above timers
    - timerId [Int]
```
Timer.clear(timerId1);
```