const { useState } = require("react");

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async () => {
        
    }


    return { data, loading, error, fn, setData };
};


