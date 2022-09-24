import React, { } from 'react'

import { Button, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { IMathVariable } from '../interfaces/IMathEquation';
import { useMathDemo } from './Context';
import { Money } from '../../ui/React/Money';

interface IStepProps {
  step: number;
  cost: number;
  disabled: boolean;
  buyVariableUpgrade: (step: number) => void;
}

function BuyButton(props: IStepProps): React.ReactElement {
  function handleClick() {
    props.buyVariableUpgrade(props.step);
  }

  return (
    <>
      <Tooltip title={<Money money={props.cost}></Money>} children={
      <span>
      <Button size='small' disabled={props.disabled} onClick={handleClick}>+{props.step}</Button>
      </span>
      }></Tooltip>
    </>
  )
}

interface IProps {
  variable: IMathVariable;
}

export function MathVariableElem(props: IProps): React.ReactElement {
  const upgradeSteps = [1, 5, 10];

  const mathDemo = useMathDemo();

  function buyVariableUpgrade(step: number) {
    const cost = props.variable.cost(step);
    if (mathDemo.knowledge < cost && !mathDemo.debug) return;
    if (!mathDemo.debug) mathDemo.knowledge -= cost;
    props.variable.buyUpgrade(step);
  }

  return (
    <Paper sx={{p: "5px", width: "500px"}}>
      <Typography variant='h6'>{props.variable.name}</Typography>
      <Stack justifyContent="flex-start" direction="row">
        <Typography paddingLeft="10px" paddingRight="20px">Level: {props.variable.level}</Typography>
        {upgradeSteps.map((step, i) => <BuyButton key={i + "b"} cost={props.variable.cost(step)} disabled={props.variable.cost(step) > mathDemo.knowledge && !mathDemo.debug} step={step} buyVariableUpgrade={buyVariableUpgrade}/>)}
      </Stack>
    </Paper>
  )
}
