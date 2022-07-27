import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
    const [country, setCountry] = useState(null);
    
    useEffect(() => {
        async function fetch() {
            console.log("Fee");
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
                setCountry(response.data[0]);
            } catch (err) {
                setCountry(null);
            }
        } 
        fetch();
    }, [name]);

    return country;
};

export default useCountry;