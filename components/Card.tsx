import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/card.module.css";

export function Card(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  console.log(size);
  const factor = (size.width || 728) < 728 ? 4 : 2;

  const HEIGHT = 825 / factor;
  const WIDTH = 1275 / factor;

  useEffect(() => {
    if (ref.current === null) {
      return;
    }
    let timerId: NodeJS.Timeout;

    const currentRef = ref.current;

    const interactionStartHandler = (e: MouseEvent): void => {
      e.preventDefault();
      const pos = [e.offsetX, e.offsetY];
      const left = pos[0];
      const top = pos[1];
      const height = HEIGHT;
      const width = WIDTH;

      const FACTOR = 1.4;
      const px = Math.abs(Math.floor((100 / width) * left) - 100);
      const py = Math.abs(Math.floor((100 / height) * top) - 100);
      const pa = 50 - px + (50 - py);
      // math for gradient / background positions
      const lp = 50 + (px - 50) / FACTOR;
      const tp = 50 + (py - 50) / FACTOR;
      const pxSpark = 50 + (px - 50) / 7;
      const pySpark = 50 + (py - 50) / 7;
      const pOpc = 20 + Math.abs(pa) * FACTOR;
      const ty = ((tp - 50) / 2) * -1;
      const tx = ((lp - 50) / FACTOR) * 0.5;

      currentRef.children[0].classList.remove(styles.animated);
      currentRef.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;
      currentRef.style.setProperty(
        "--sparkles-position",
        `${pxSpark}% ${pySpark}%}`
      );
      currentRef.style.setProperty("--sparkles-opacity", `${pOpc / 100}`);
      currentRef.style.setProperty("--gradient-position", `${lp}% ${tp}%`);
      clearTimeout(timerId);
    };

    const interactionEndHandler = (): void => {
      currentRef.style.transform = "";
      currentRef.style.setProperty("--sparkles-position", "50% 50%");
      currentRef.style.setProperty("--sparkles-opacity", "0.75");
      currentRef.style.setProperty("--gradient-position", "50% 50%");

      timerId = setTimeout(() => {
        currentRef.children[0].classList.add(styles.animated);
      }, 1000);
    };

    ref.current.addEventListener("mousemove", interactionStartHandler);
    ref.current.addEventListener("mouseout", interactionEndHandler);

    return () => {
      currentRef.removeEventListener("mousemove", interactionStartHandler);
      currentRef.removeEventListener("mouseout", interactionEndHandler);
    };
  }, [HEIGHT, WIDTH]);

  return (
    <div
      className={styles.imageWrapper}
      ref={ref}
      style={{
        // @ts-expect-error - handle css custom properties
        "--height-prop": `${HEIGHT}px`,
        "--width-prop": `${WIDTH}px`,
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          alt={""}
          className={styles.image}
          height={HEIGHT}
          src={"/card.png"}
          width={WIDTH}
        />
      </div>
    </div>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        // @ts-expect-error
        width: window.innerWidth,
        // @ts-expect-error
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
