import { useCallback, useEffect, useRef, useState } from "react";

// Inspirations for this hook:
// https://gist.github.com/simicd/bbf37fe119c7b344634e4d47d2709fea

export const useFetch = (url, fetchOptions, processData) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    let counter = useRef(0);

    // If no processing function is passed just return the data
    // The callback hook ensures that the function is only created once
    // and hence the effect hook below doesn't start an infinite loop
    const processJson = useCallback(
        processData || ((jsonBody) => (jsonBody)),
        []);

    // Turn objects into strings for useCallback & useEffect dependencies
    const stringifiedUrl = JSON.stringify(url);
    const stringifiedFetchOpt = JSON.stringify(fetchOptions);

    useEffect(() => {
        counter.current++;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setIsPending(true);

                const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const resData = await res.json();
                const processedData = processJson(resData);
                setIsPending(false);
                setData(processedData);
                setError(null);
            } catch (e) {
                if (e.name === 'AbortError') {
                    console.log('The fetch was aborted');
                } else {
                    setIsPending(false);
                    setError(e.message);
                }
            }
        };

        fetchData();

        // Cleanup function for unmouting phase
        return () => {
            console.log('Unmounted hooks')
            controller.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringifiedUrl, stringifiedFetchOpt, processData]);

    return { data, isPending, error };
}
