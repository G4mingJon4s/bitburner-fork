import { Typography } from '@mui/material'
import React from 'react'
import { IMathTheory } from '../interfaces/IMathTheory'
import { MathEquationElem } from './MathEquationElem';

interface IProps {
  theory: IMathTheory;
  rerender: () => void;
}

export function MathTheoryElem(props: IProps): React.ReactElement {
  return (
    <>
      <Typography variant='h6'>{props.theory.name}</Typography>
      <Typography>Current Multiplier: {(props.theory.theoryMult * 100).toFixed(2)}%</Typography>
      {props.theory.equations.map((equation, i) => <MathEquationElem key={i + "te"} equation={equation} isInTheory={true} rerender={props.rerender} theoryName={props.theory.name} canRemove={props.theory.equations.length > 1}/>)}
    </>
  )
}
