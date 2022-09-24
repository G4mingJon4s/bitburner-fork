import { IPlayer } from "src/PersonObjects/IPlayer";
import { IMathDemo } from "./IMathDemo";

export interface IMathEquation {
  equationString: string;
  equationFunction: (...variables: IMathVariable[]) => number;
  variables: IMathVariable[];
  name: string;
  
  process: (mathDemo: IMathDemo, player: IPlayer, opts?: { theoryMult: number }) => void;
}

export interface IMathVariable {
  name: string;
  level: number;
  cost: (upgrades: number) => number; // change to function for exp. cost
  buyUpgrade: (step: number) => void;

  v: number;
}