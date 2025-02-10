import { useState } from 'react';
import { NAMES } from '../config/config.js';
// HOOK PARA LOGICA DE OPCIONES ELEGIDAS
export function useSort(){
  const [sortAlfa, setSortAlfa] = useState(false);
  const [sortYear, setSortYear] = useState(false);
  const [noSort, setNoSort] = useState(true);

  const {noSortValue, sortAlfaValue} = NAMES;

  const choiceSort = ({ value })=>{
    // RESETEAR ESTADOS
    setNoSort(false);
    setSortAlfa(false);
    setSortYear(false);
    
    if (value === noSortValue) {
      setNoSort(true);
    } else if (value === sortAlfaValue) {
      setSortAlfa(true);
    } else{
      setSortYear(true);
    }
  };

  return { noSort,sortAlfa, sortYear, choiceSort };
};
     