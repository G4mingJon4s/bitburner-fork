import { IPlayer } from "src/PersonObjects/IPlayer";
import { EMathTrait } from "./data/EMathTrait";
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
    const matches = this.equations.reduce((acc, equation) => {
      equation.traits.forEach(trait => acc.set(trait, (acc.get(trait) ?? 0) + 1));
      return acc;
    }, new Map<EMathTrait, number>());
    const matchingMult = Object.entries(matches).reduce((acc, entry) => {
      if (entry[1] === 0) return acc;
      if (entry[1] > 2) return acc + 1;
      return acc + 0.5;
    }, 1);
    this.theoryMult = this.equations.reduce((acc, equation) => Math.log10(acc + equation.variables.reduce((acc, variable) => acc + variable.level, 0)), 1) * matchingMult;
    
    this.equations.forEach((equation) => equation.process(mathDemo, player, { theoryMult: this.theoryMult }));
  }

  addEquation(equation: IMathEquation, mathDemo: IMathDemo) {
    if (!mathDemo.equations.includes(equation)) throw new Error("Equation does not exist in mathDemo!");
    if (this.equations.length > 4) throw new Error("Theory is full!");
    this.equations.push(equation);
    mathDemo.equations.splice(mathDemo.equations.indexOf(equation), 1);
  }

  removeEquation(equation: IMathEquation) {
    if (!this.equations.includes(equation)) throw new Error("Could not find equation");
    this.equations.splice(this.equations.indexOf(equation), 1);
  }
}