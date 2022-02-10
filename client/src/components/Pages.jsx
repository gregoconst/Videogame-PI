import React from "react";
import { useState } from "react";

export const Pages = ({pagina, setPagina, maxrender}) => {
  const [input, setInput] = useState(1); //estado local
  const proximaPagina = () => {
    setInput(parseInt(input) + 1);
    setPagina(parseInt(pagina) + 1);
  };
  const volverPagina = () => {
    setInput(parseInt(input) - 1);
    setPagina(parseInt(pagina) - 1);
  };

  const handleInput = (e) => {
    if (e.keycode === 13) {
      setPagina(parseInt(e.target.value));
    }
    if (
      parseInt(e.target.value < 1) ||
      parseInt(e.target.value) > Math.ceil(maxrender) ||
      isNaN(parseInt(e.target.value))
    ) {
        setPagina(1)
        setInput(1)
    } else {
        setPagina(parseInt(e.target.value))
    }
  };

  const handleChange = (e) => {
      setInput(parseInt(e.target.value))
  }
  return (
    <div>
      <button disabled={pagina === 1 || pagina < 1} onClick={volverPagina}>◀</button>&nbsp;
      {/* <input onChange={(e)=>handleChange(e)} onKeyDown={(e) => handleInput(e)} name="page" autoComplete="off" value={input} /> */}
      <button>{input}</button>
      &nbsp;de&nbsp;
       <button>{Math.ceil(maxrender)}</button>&nbsp;
      <button disabled={pagina === Math.ceil(maxrender) || pagina > Math.ceil(maxrender)} onClick={proximaPagina}>▶</button>
    </div>
  );
};
