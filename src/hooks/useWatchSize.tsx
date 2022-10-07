import { useEffect, useState } from "react";

export default function useWatchSizeInRem(elementId: string, defaultSize: number) {
  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    function handleResize() {
      const rem = parseInt(getComputedStyle(document.documentElement).fontSize.slice(0, 2));
      const htmlElement = document.getElementById(elementId);
      setSize(htmlElement ? htmlElement.offsetHeight / rem : defaultSize);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [elementId, defaultSize]);

  return size;
}
