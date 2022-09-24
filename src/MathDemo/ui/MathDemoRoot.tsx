import React, { useState, useEffect } from 'react';

import { Button, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { MathOverview } from './MathOverview';
import { Context } from './Context';
import { use } from '../../ui/Context';
import { MathEquationElem } from './MathEquationElem';
import { Money } from '../../ui/React/Money';
import { MathTheoryModal } from './MathTheoryModal';
import { MathTheoryElem } from './MathTheoryElem';
import { IMathTheory } from '../interfaces/IMathTheory';

export function MathDemoRoot(): React.ReactElement {

  const player = use.Player();
  const mathDemo = player.mathDemo;

  if (mathDemo === null) return <></>

  const [currentWindow, setCurrentWindow] = useState("Overview");
  const [theoryModalOpen, setTheoryModalOpen] = useState(false);

  const setRerender = useState(false)[1];
  function rerender(): void {
    setRerender((old) => !old);
  }

  useEffect(() => {
    const id = setInterval(rerender, 200);
    return () => clearInterval(id);
  }, []);

  function handleChange(event: React.SyntheticEvent, tab: string): void {
    setCurrentWindow(tab);
    console.log(tab);
  }

  function handleNewEquation() {
    mathDemo?.addNewEquation();
    console.log("New Equation");
    rerender();
  }

  const canMakeNewTheory = mathDemo.equations.length > 0;

  function handleNewTheory() {
    if (!canMakeNewTheory) return;
    setTheoryModalOpen(true);
  }

  function onSubmit(equationIndex: number, theoryName: string) {
    if (mathDemo === null) throw new Error("Cannot add theory: mathDemo is null");
    console.log("New Theory");
    mathDemo.addNewTheory(theoryName, mathDemo.equations[equationIndex]);
  }

  function getTheory(theoryName: string): IMathTheory {
    if (mathDemo === null) throw new Error("mathDemo is null");
    const index = mathDemo.theories.findIndex((theory) => theory.name === theoryName);
    if (index < 0) throw new Error("Could not find theory inside mathDemo.");
    return mathDemo.theories[index];
  }

  const windows = ["Overview", "Equations", "New Theory"];

  return (
    <Context.MathDemo.Provider value={mathDemo}>
      <Typography variant='h4'>Math Demo</Typography>
      <Money money={mathDemo.knowledge}></Money>
      <Tabs variant="scrollable" value={currentWindow} onChange={handleChange} sx={{ maxWidth: "65vw" }} scrollButtons>
        <Tab label={"Overview"} value={"Overview"} />
        <Tab label={"Equations"} value={"Equations"} />
        {mathDemo.theories.map((theory, i) => (
          <Tab key={i + "t"} label={theory.name} value={theory.name}/>
        ))}
        <Tab label={"New Theory"} value={"New Theory"} />
      </Tabs>
      {currentWindow === "Overview" && <MathOverview rerender={rerender} />}
      {currentWindow === "Equations" && (
        <>
        <Typography variant='h6'>Equations {mathDemo.debug ? "DEBUG MODE ACTIVATED - NO COSTS" : ""}</Typography>
          <Paper>
            <Typography>Here, you can see all of your equations. Later on you can bundle them together to make a theory.</Typography>
            {mathDemo.equations.length < 4 && <Button onClick={handleNewEquation}>Come up with a new Equation</Button>}
            {mathDemo.equations.length > 0 && (
            <Stack direction="column">
              {mathDemo.equations.map((equation, i) => <MathEquationElem key={i} equation={equation} isInTheory={false} rerender={rerender}></MathEquationElem>)}
            </Stack>
            )}
          </Paper>
        </>
      )}
      {!windows.includes(currentWindow) && <MathTheoryElem theory={getTheory(currentWindow)} rerender={rerender}/>}
      {currentWindow === "New Theory" && (
      <>
        <Typography variant='h6'>Create a new Theory!</Typography>
        <Button onClick={handleNewTheory} disabled={!canMakeNewTheory}>Create a new Theory!</Button>
        <MathTheoryModal cost={20e7} onClose={() => setTheoryModalOpen(false)} open={theoryModalOpen} onSubmit={onSubmit}></MathTheoryModal>
      </>
      )}
    </Context.MathDemo.Provider>
  )
}
