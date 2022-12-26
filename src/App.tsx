import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface Dot {
  clientX: number;
  clientY: number;
}

function App() {
  const [dotList, setDotList] = useState<Dot[]>([]);
  const [oldDotsList, setOldDotsList] = useState<Dot[]>([]);

  const handleAddDots = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setDotList([
      ...dotList,
      { clientX: event.clientX, clientY: event.clientY },
    ]);
  };

  const handleRemoveDots = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if(dotList.length === 0){
      return;
    }

    const removedDot: Dot = dotList[(dotList.length - 1)]

    setDotList(dotList.slice(0, -1))
    setOldDotsList([...oldDotsList, removedDot])
  };

  const handleRecoverDots = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if(oldDotsList.length === 0){
      return;
    }

    const recoveredDot: Dot = oldDotsList[(oldDotsList.length - 1)]

    setDotList([...dotList, recoveredDot])
    setOldDotsList(oldDotsList.slice(0, -1))
  };

  return (
    <div className="app" onClick={(event) => handleAddDots(event)}>
      <div className="button_area">
        <button onClick={(event) => handleRemoveDots(event)}>Undo</button>
        <button onClick={(event) => handleRecoverDots(event)}>ReDo</button>
      </div>
      {dotList.map((dot) => {
        return (
          <span
            key={`${dot.clientX}_${dot.clientY}`}
            className="dot"
            style={{ left: dot.clientX, top: dot.clientY }}
          />
        );
      })}
    </div>
  );
}

export default App;
