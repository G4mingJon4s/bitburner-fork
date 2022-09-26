import { IPlayer } from "src/PersonObjects/IPlayer";
import { IMathEquation } from "./IMathEquation";
import { IMathTheory } from "./IMathTheory";

export interface IMathDemo {
  theories: IMathTheory[];
  equations: IMathEquation[];
  knowledge: number;

  debug: boolean;

  storedCycles: number;

  addNewTheory: (name: string, startEquation: IMathEquation) => void;
  addNewEquation: () => void;
  removeEquation: (equation: IMathEquation) => void;
  removeTheoryEquation: (equation: IMathEquation, theoryName: string) => void;
  process: (player: IPlayer) => void;
  storeCycles: (numCycles: number) => void;
}