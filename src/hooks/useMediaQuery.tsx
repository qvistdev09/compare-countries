import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    if (mediaQuery.matches) {
      setMatches(true);
    }
    function callback(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    mediaQuery.addEventListener('change', callback);
    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  }, []);

  return matches;
}
