import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}


//codigo para colocar quando for usar o debounce:

// const debouncedSearch = useDebounce(searchValue, 1000); // 1 segundo de debounce para pesquisar uma redação :)
// const handleChangeRef = useRef(handleChange);

// useEffect(() => {
//   handleChangeRef.current = handleChange;
// }, [handleChange]);

// useEffect(() => {
//   if (!hasEnteredView) return
//   handleChangeRef.current(debouncedSearch);
// }, [debouncedSearch, hasEnteredView]);