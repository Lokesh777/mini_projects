import { useRef, useState } from "react";

type positionProp = {
  left: number;
  top: number;
};

const initObject: positionProp = {
  left: 0,
  top: 0,
};

const buttonWidth = 100;
const buttonHeight = 50;

const MovingButton = () => {
  const [position, setPosition] = useState(initObject);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
   if(containerRef?.current){
    setPosition((prev:positionProp)=> {
      const space = prev.left + buttonWidth;

      if(space + buttonWidth <= containerRef?.current!.clientWidth){
        return {
          left: space,
          top: prev.top
        }
      }
      return {
        left:0,
        top: prev.top + buttonHeight
      }
    })
   }
  }
  return (
    <>
      <h3>Moving button when you click over</h3>
      <div ref={containerRef}>
        <button
          style={{
            position: "relative",
            left: position.left,
            top: position.top,
            width: buttonWidth,
            height: buttonHeight,
          }}
          onClick={moveButton}
        >
          Click Me
        </button>
      </div>
    </>
  );
};

export default MovingButton;
