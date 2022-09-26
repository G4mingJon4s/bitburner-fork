import { IPlayer } from "src/PersonObjects/IPlayer";
import { IMathDemo } from "./IMathDemo";
import { IMathEquation } from "./IMathEquation";

export interface IMathTheory {
  name: string;
  equations: IMathEquation[];
  theoryMult: number;
  process: (mathDemo: IMathDemo, player: IPlayer) => void;
  addEquation: (equation: IMathEquation, mathDemo: IMathDemo) => void;
  removeEquation: (equation: IMathEquation) => void;
}