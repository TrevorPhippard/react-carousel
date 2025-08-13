import { useEffect, useMemo, useState } from "react";
import img1 from "./../../assets/400x400.jpg";
import img2 from "./../../assets/600x400.jpg";
import img3 from "./../../assets/600x600.jpg";

import Slide from "../Slide";

export default function Carousel() {
  // cache image array
  const images = useMemo(() => [img1, img2, img3], []);

  const [slideNum, setSlideNum] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    console.log("component mount");

    return function takedown() {
      console.log("component unmount");
    };
  }, [images]);

  const handleClick = (num: number) => {
    const len = images.length;
    const newVal = (((slideNum + num) % len) + len) % len;
    setDirection(num > 0 ? "right" : "left");
    setSlideNum(newVal);
  };

  const handleCrumbClick = (num: number) => {
    setDirection(num > slideNum ? "right" : "left");
    setSlideNum(num);
  };

  return (
    <>
      <div>
        {images.map((x, i) => {
          if (slideNum == i && x !== undefined) {
            // note to self look at what key is doing other than just "performance"
            return (
              <Slide
                key={`slide_${slideNum}`} // ensures remount and reanimation
                slideNumer={slideNum}
                imgPath={images[slideNum]}
                direction={direction}
              />
            );
          }
        })}
      </div>
      <div className="btnCont">
        <button onClick={() => handleClick(-1)}>prev</button>
        <button onClick={() => handleClick(1)}>next</button>
      </div>
      <ul className="crumbCont">
        {images.map((_x, i) => {
          return <li key={`crumb_${i}`} onClick={() => handleCrumbClick(i)} />;
        })}
      </ul>
    </>
  );
}
