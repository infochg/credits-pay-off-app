import { useState, useEffect, useCallback } from 'react';

function useWindowScroll() {
  const isClient = typeof window === 'object';

  const getScroll = useCallback(() => {
    return {
      scrollX: isClient ? window.scrollX : undefined,
      scrollY: isClient ? window.scrollY : undefined
    };
  }, [isClient]);

  const [windowScroll, setWindowScroll] = useState(getScroll);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleScroll() {
      setWindowScroll(getScroll());
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getScroll, isClient]);

  return windowScroll;
}

export default useWindowScroll;
