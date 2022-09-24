import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Modal } from '../../ui/React/Modal'
import { useMathDemo } from './Context';

interface IProps {
  onClose: () => void;
  onSubmit: (selectedTheory: string[]) => void;
  open: boolean;
}

export function MathTheorySelectModal(props: IProps): React.ReactElement {

  const mathDemo = useMathDemo();

  if (mathDemo.theories.length === 0) return <></>;

  const [selectedTheory, setSelectedTheory] = useState([String(0), mathDemo.theories[0].name]);

  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  const regEx = /^(\d+)(.+)$/;

  function handleChangeTheory(event: SelectChangeEvent<string>) {
    const values = event.target.value.match(regEx);
    console.log(event.target.value, values); 
    if (values === null) throw new Error("RegEx could not fetch theory index and name!");
    if (values.length < 3) throw new Error("RegEx: What?");
    setSelectedTheory([values[1], values[2]]);
    rerender();
  }

  function handleSubmit() {
    props.onClose();
    props.onSubmit(selectedTheory);
  }

  return (
    <Modal onClose={props.onClose} open={props.open}>
      <Typography>Choose the theory to add the equation to!</Typography>
      <Box display="flex" alignItems="center">
        <Select value={selectedTheory.join("")} onChange={handleChangeTheory}>
          {mathDemo.theories.map((theory, i) => (
            <MenuItem key={i + "me" + theory.name} value={i + theory.name}>
              {i + 1}# {theory.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button onClick={handleSubmit}>Add to theory!</Button>
    </Modal>
  )
}
