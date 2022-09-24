import { IPlayer } from "../PersonObjects/IPlayer";
import { mathEquationList } from "./data/MathEquations";
import { IMathDemo } from "./interfaces/IMathDemo";
import { IMathEquation } from "./interfaces/IMathEquation";
import { IMathTheory } from "./interfaces/IMathTheory";
import { MathTheory } from "./MathTheory";

export class MathDemo implements IMathDemo {
  theories: IMathTheory[];
  equations: IMathEquation[];
  storedCycles: number;
  knowledge: number;
  
  debug: boolean;

  constructor() {
    this.theories = [];
    this.equations = [];
    this.storedCycles = 0;
    this.knowledge = 1e5;

    this.debug = false;
  }

  addNewTheory(theoryName: string, startEquation: IMathEquation) {
    const theory = new MathTheory(theoryName, startEquation, this);
    this.theories.push(theory);
  }

  addNewEquation() {
    const newEquation = mathEquationList[Math.floor(Math.random() * mathEquationList.length)];
    this.equations.push(newEquation());
    console.log("New equation");
  }

  removeEquation(equation: IMathEquation) {
    this.equations.splice(this.equations.indexOf(equation), 1);
    console.log("Remove equation");
  }

  process(player: IPlayer) {
    if (this.storedCycles < 20) return; // constant later on
    this.equations.forEach((equation) => equation.process(this, player));
    this.theories.forEach((theory) => theory.process(this, player));
    this.storedCycles -= 20; // constant later on
  }

  storeCycles(numCycles: number) {
    this.storedCycles += numCycles;
  }
}