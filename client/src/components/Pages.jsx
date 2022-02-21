import React from "react";
import { useState } from "react";
import "./styles/Pages.css";
export const Pages = ({pagina, setPagina, maxrender}) => {
  // const paginas = Math.ceil(maxrender)
  // let numerodepaginas = []; DEPRECATED??? al final no lo usé
  // for (let i = 1; i <= paginas; i++){
  //   numerodepaginas.push(i)
  // } 
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
      <button className="button-54" disabled={pagina <= 1} onClick={volverPagina}>◀</button>&nbsp;
      <button className="button-54mod" >{input}</button>
      &nbsp;
      <label className="button-54mod">OF</label> 
      &nbsp;
       <button className="button-54mod">{Math.ceil(maxrender)}</button>&nbsp;
      <button className="button-54" disabled={pagina >= Math.ceil(maxrender)} onClick={proximaPagina}>▶</button>
    </div>
  );
};
