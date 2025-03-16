import { useState, useEffect } from "react";

const placeholderTextArray = [
  "'skill'",
  "'title'",
  "'company'",
]

const PlaceHolderEffect = (delay = 2000) => {
    const constantText = "Search jobs by ";
    const [searchPlaceholder, setSearchPlaceholder] = useState(constantText + placeholderTextArray[0]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setSearchPlaceholder(constantText + placeholderTextArray[index]);
            index = (index + 1) % placeholderTextArray.length;
        }, delay);

        return () => clearInterval(interval);
    }, [placeholderTextArray, delay]);

    return searchPlaceholder;
};

export default PlaceHolderEffect;
