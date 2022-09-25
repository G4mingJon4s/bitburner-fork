import React from 'react'

import { Button, Switch, Typography } from '@mui/material'
import { use } from '../../ui/Context';
import { MathDemo } from '../MathDemo';

interface IProps {
  rerender: () => void;
}

export function MathOverview(props: IProps): React.ReactElement {
  const player = use.Player();

  function reset() {
    player.mathDemo = new MathDemo();
    props.rerender();
  }

  function handleDebugChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void {
    if (player.mathDemo === null) return;
    player.mathDemo.debug = checked;
    console.log("Debug mode " + (checked ? "enabled." : "disabled."));
  }

  return (
    <>
      <Typography variant='h6'>Math Overview</Typography>
      <Typography>Reset - I advice to use this after each page reload!</Typography>
      <Button onClick={reset}>Hard reset</Button>
      <Typography>Debug Mode - Needs to be toggled after each reset!</Typography>
      <Switch defaultChecked={player.mathDemo?.debug} onChange={handleDebugChange}></Switch>

      <Typography variant='h6' sx={{mt: "30px"}}>Info</Typography>
      <Typography>This is a demo for my imagined way of implementing the game exponential idle.</Typography>
      <Typography>This is a demo! Not all features are implemented and are expected to have bugs.</Typography>
      <Typography>Nothing I made is made to be final and nothing is balanced!</Typography>
      <Typography>THIS IS NOT FINAL IN ANY WAY</Typography>
      <Typography>The code is pretty inconsistent and doesn't follow any rules on how to do things!</Typography>
      <Typography>Do note I am pretty new to react, so some things in the code might be a bit "wanky"!</Typography>
      <Typography>The equations and their code implementations are also probably wrong...</Typography>
      <Typography>You can contact me on anything regarding this demo or idea on discord per DM or pinging me on the Bitburner server.</Typography>
      <Typography>Discord: G4mingJon4s#6950</Typography>

      <Typography variant='h6' sx={{mt: "30px"}}>Todo</Typography>
      <Typography>Here are some things I have recently done, things that are work in progress and things that need to be done / might be added</Typography>
      <Typography>This list is changing quite a lot, so don't rely on it. I do not state in any way any of these things down below are accurate or reflect any meaning.</Typography>
      <Typography>This list is only to show what is to be expected of this demo.</Typography>
      <Typography>{"[X] <- This has been done recently. [-] <- This is work in progress. [ ] <- This is coming soon™. [?] This might be added."}</Typography>
      <Typography>{"[X] Theory creation and UI"}</Typography>
      <Typography>{"[X] Adding equations to theories after creation"}</Typography>
      <Typography>{"[X] Added some more equations (PI approximation and integral)"}</Typography>
      <Typography>{"[-] Removing equations from theories back to the equations list"}</Typography>
      <Typography>{"[ ] Adding an exponential cost to making theories and equations"}</Typography>
      <Typography>{"[ ] Removing theories / Changing theory names"}</Typography>
      <Typography>{"[ ] Displaying equation name"}</Typography>
      <Typography>{"[ ] An actual overview"}</Typography>
      <Typography>{"[ ] Equation stats"}</Typography>
      <Typography>{"[ ] More equations"}</Typography>
      <Typography>{"[ ] Selling theories (getting money from them)"}</Typography>
      <Typography>{"[?] Balancing"}</Typography>
      <Typography>{"[?] Publishing theories (getting global rep from them) (might be too OP?)"}</Typography>
      <Typography>{"[?] New mechanic"}</Typography>
    </>
  )
}