import { useEffect, useRef, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  const mediaQueryList = useRef();

  useEffect(() => {
    mediaQueryList.current = window.matchMedia(query);
    const listener = (e) => setMatches(e.matches);
    mediaQueryList.current.addEventListener("change", listener);

    return () => {
      mediaQueryList.current.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
