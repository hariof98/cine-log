import { useCallback, useRef } from "react";

const useDebounce = (fn, delay = 300) => {
    let timeout = useRef(null);

    const debouncedFn = useCallback(
        (...args) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                fn(...args);
            }, delay);
        },
        [fn, delay]
    );

    return debouncedFn;
};

export default useDebounce;
