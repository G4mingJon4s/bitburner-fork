import { IPlayer } from "src/PersonObjects/IPlayer";
import { EMathTrait } from "./data/EMathTrait";
import { IMathDemo } from "./interfaces/IMathDemo";
import { IMathEquation, IMathVariable } from "./interfaces/IMathEquation";

export class MathEquation implements IMathEquation {
  equationString: string;
  equationFunction: (...variables: IMathVariable[]) => number;
  variables: IMathVariable[];
  name: string;
  traits: EMathTrait[];

  constructor(name: string, equationString: string, equationFunction: (...variables: IMathVariable[]) => number, variables: IMathVariable[], traits: EMathTrait[]) {
    this.equationString = equationString;
    this.equationFunction = equationFunction;
    this.variables = variables;
    this.name = name;
    this.traits = traits;
  }

  process(mathDemo: IMathDemo, __player: IPlayer, opts: { theoryMult: number } = { theoryMult: 1 }) {
    const { theoryMult } = opts;
    const gain = this.equationFunction(...this.variables) * theoryMult;
    mathDemo.knowledge += gain;
  }
}

export class MathVariable implements IMathVariable {
  name: string;
  level: number;
  cost: (upgrades: number) => number;

  constructor(name: string, base = 10, pow = 1.3) {
    this.name = name;
    this.level = 1;
    this.cost = (uprades: number) => Array(uprades).fill(this.level).reduce((acc, val, up) => acc + Math.pow(val + up + base, pow), 0);
  }

  static fromCostFunc(name: string, costFunc: (upgrades: number) => number) {
    const variable = new MathVariable(name);
    variable.cost = costFunc;
    return variable;
  }

  get v() { return this.level; }

  buyUpgrade(step: number) {
    this.level += step;
  }
}