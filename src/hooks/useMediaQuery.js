import { useEffect, useRef, useState } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  const mediaQueryList = useRef(window.matchMedia(query));

  useEffect(() => {
    const listener = (e) => setMatches(e.matches);
    mediaQueryList.current.addEventListener("change", listener);

    return () => {
      mediaQueryList.current.removeEventListener("change", listener);
    };
  }, []);

  return matches;
};

export default useMediaQuery;
