import { useState, useEffect } from 'react';

/**
 * Custom hook to persist state to localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value
 * @returns {[*, Function]}
 */
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            /* Quota exceeded – fail silently */
        }
    }, [key, value]);

    return [value, setValue];
}
