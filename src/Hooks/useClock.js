import { useState, useEffect } from 'react';

export const useClock = () => {

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return currentTime;

};