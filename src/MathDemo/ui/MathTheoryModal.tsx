import React, { useState } from 'react'

import { Box, Button, Input, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { Modal } from "../../ui/React/Modal";
import { useMathDemo } from './Context';
import { Money } from '../../ui/React/Money';

interface IProps {
  open: boolean;
  onClose: () => void;
  cost: number;
  onSubmit: (equationIndex: number, theoryName: string) => void;
}

export function MathTheoryModal(props: IProps): React.ReactElement {
  const mathDemo = useMathDemo();

  if (mathDemo.equations.length === 0) return <></>

  const [selectedEquation, setSelectedEquation] = useState([Number(0).toString(), mathDemo.equations[0].name]);
  const [theoryName, setTheoryName] = useState("");

  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  const disabled = props.cost > mathDemo.knowledge && !mathDemo.debug;

  const regEx = /^(\d+)(.+)$/;

  function handleChangeEquation(event: SelectChangeEvent<string>) {
    const values = event.target.value.match(regEx);
    console.log(event.target.value, values); 
    if (values === null) throw new Error("RegEx could not fetch equation index and name!");
    if (values.length < 3) throw new Error("RegEx: What?");
    setSelectedEquation([values[1], values[2]]);
    rerender();
  }

  function handleNameChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setTheoryName(event.target.value);
  }

  function handleNewTheory() {
    props.onClose();
    props.onSubmit(Number(selectedEquation[0]), theoryName);
  }

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Typography>Create a new Theory! {mathDemo.debug ? "DEBUG MODE ACTIVATED - NO COST" : ""}</Typography>
      <Typography>Theories allow you to bundle multiple equations together to gain multipliers!</Typography>
      <Typography>Choose an equation you want to put into a theory! You can remove equations from any unpublished theory, if you have enough space.</Typography>
      <Box display="flex" alignItems="center">
        <Select value={selectedEquation.join("")} onChange={handleChangeEquation}>
          {mathDemo.equations.map((equation, i) => (
            <MenuItem key={i + "me" + equation.name} value={i + equation.name}>
              {i + 1}# {equation.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Typography paddingLeft={"5px"}>Will create a theory with the name "{theoryName}"" with the equation "{selectedEquation[1]}"</Typography>
      <Input placeholder='Theory Name' onChange={handleNameChange}></Input>
      <Tooltip children={
        <span>
          <Button sx={{mx: 1}} disabled={disabled} onClick={handleNewTheory}>Create new theory</Button>
        </span>
      } title={<Money money={props.cost} />} />
    </Modal>
  )
}