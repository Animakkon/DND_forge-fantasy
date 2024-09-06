const MIN_TIMEOUT_MS = 3000
let counter = 0;

export function simpleDebounce(
    func: (...args: Params) => any,
    timeout = MIN_TIMEOUT_MS
){
    let timer;

    counter++

    console.log(counter)
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(
            () => func.apply(this, args),
            timeout
        );
    }
}
