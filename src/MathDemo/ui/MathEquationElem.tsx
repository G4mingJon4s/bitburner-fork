import React, { useState } from 'react'

import { Button, Paper, Typography } from '@mui/material'
import { MathJaxWrapper } from '../../MathJaxWrapper'
import { IMathEquation } from '../interfaces/IMathEquation'
import { MathVariableElem } from './MathVariableElem';
import { useMathDemo } from './Context';
import { MathTheorySelectModal } from './MathTheorySelectModal';

interface IProps {
  equation: IMathEquation;
  isInTheory: boolean;
  rerender: () => void;
}

export function MathEquationElem(props: IProps): React.ReactElement {

  const mathDemo = useMathDemo();
  
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  function handleAddToTheory() {
    setSelectModalOpen(true);
    props.rerender();
  }

  function onSubmit(selectedTheory: string[]) {
    const [theoryIndex] = selectedTheory;
    if (Number.parseInt(theoryIndex) === Number.NaN) throw new Error("Invalid theory index!");
    const theory = mathDemo.theories[Number.parseInt(theoryIndex)];
    theory.addEquation(props.equation, mathDemo);
  }

  function handleRemoveEquation() {
    if (props.isInTheory) {
      console.log("This is WIP!");

      props.rerender();
      return;
    }
    mathDemo.removeEquation(props.equation);
    props.rerender();
  }

  return (
    <Paper sx={{p: "10px"}}>
      <Typography variant='h6'><MathJaxWrapper>{props.equation.equationString}</MathJaxWrapper></Typography>
      {props.equation.variables.map((variable, i) => <MathVariableElem key={i + "v"} variable={variable} />)}
      {(!props.isInTheory && mathDemo.theories.length > 0) && <Button onClick={handleAddToTheory}>Add to theory</Button>}
      <Button color='error' disabled={!(!props.isInTheory || mathDemo.equations.length < 4)} onClick={handleRemoveEquation}>Remove Equation</Button>
      <MathTheorySelectModal onClose={() => setSelectModalOpen(false)} open={selectModalOpen} onSubmit={onSubmit}></MathTheorySelectModal>
    </Paper>
  )
}