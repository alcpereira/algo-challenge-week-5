import { useState, useEffect } from "react";

export type MousePosition = {
  /** X position of the cursor (horizontal) - 0 is left */
  x: number;
  /** Y position of the cursor (vertical) - 0 is top */
  y: number;
};

const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return position;
};

export default useMousePosition;
