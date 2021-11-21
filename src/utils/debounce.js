export default function debounce(f, t) {
    let lastCall, lastCallTimer

    return function (args) {
        let previousCall = lastCall;
        lastCall = Date.now();
        if (previousCall && ((lastCall - previousCall) <= t)) {
            clearTimeout(lastCallTimer);
        }
        lastCallTimer = setTimeout(() => f(args), t);
    }
}
