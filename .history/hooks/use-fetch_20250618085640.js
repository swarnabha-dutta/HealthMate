const { useState } = require("react");

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);




        try {
            const response = await cb
        } catch (err) {
            
        }
    }


    return { data, loading, error, fn, setData };
};


export default useFetch;