import React from "react";
import { useState } from "react";
import "./styles/Pages.css";
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
  return (
    <div>
      <button className="button-54" disabled={pagina === 1 || pagina < 1} onClick={volverPagina}>◀</button>&nbsp;
      <button className="button-54mod" >{input}</button>
      &nbsp;
      <label className="button-54mod">DE</label> 
      &nbsp;
       <button className="button-54mod">{Math.ceil(maxrender)}</button>&nbsp;
      <button className="button-54" disabled={pagina === Math.ceil(maxrender) || pagina > Math.ceil(maxrender)} onClick={proximaPagina}>▶</button>
    </div>
  );
};
