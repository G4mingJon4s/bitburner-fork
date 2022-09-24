import { IPlayer } from "src/PersonObjects/IPlayer";
import { IMathDemo } from "./interfaces/IMathDemo";
import { IMathEquation } from "./interfaces/IMathEquation";
import { IMathTheory } from "./interfaces/IMathTheory";

export class MathTheory implements IMathTheory {
  equations: IMathEquation[];
  name: string;
  theoryMult: number;

  constructor(name: string, startEquation: IMathEquation, mathDemo: IMathDemo) {
    this.name = name;
    this.equations = Array<IMathEquation>();
    this.addEquation(startEquation, mathDemo);
    this.theoryMult = 1;
  }

  process(mathDemo: IMathDemo, player: IPlayer) {
    this.theoryMult = this.equations.reduce((acc, equation) => Math.log10(acc + equation.variables.reduce((acc, variable) => acc + variable.level, 0)), 1);
    this.equations.forEach((equation) => equation.process(mathDemo, player, { theoryMult: this.theoryMult }));
  }

  addEquation(equation: IMathEquation, mathDemo: IMathDemo) {
    if (!mathDemo.equations.includes(equation)) throw new Error("Equation does not exist in mathDemo!");
    if (this.equations.length > 4) throw new Error("Theory is full!");
    this.equations.push(equation);
    mathDemo.equations.splice(mathDemo.equations.indexOf(equation), 1);
  }
}