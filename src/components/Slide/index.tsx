type SlideProps = {
  imgPath: string | undefined;
  slideNumer: number;
  direction: "left" | "right";
};

export default function Slide({ imgPath, slideNumer, direction }: SlideProps) {
  const animationClass =
    direction === "right" ? "slide-animate-right" : "slide-animate-left";

  return (
    <div className={animationClass}>
      <img src={imgPath} />
      <p>
        {slideNumer}: {imgPath}
      </p>
    </div>
  );
}
