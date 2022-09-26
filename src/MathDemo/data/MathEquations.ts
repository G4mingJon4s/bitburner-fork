import { IMathEquation, IMathVariable } from "../interfaces/IMathEquation";
import { MathEquation, MathVariable } from "../MathEquation";
import { EMathTrait } from "./EMathTrait";

export const mathEquationList: (() => IMathEquation)[] = [
  () => new MathEquation("Product 1", "\\(f(a, b) = a \\cdot b\\)", (a: IMathVariable, b: IMathVariable) => a.v * b.v, [new MathVariable("a"), new MathVariable("b")], [EMathTrait.linear]),
  () => new MathEquation("Rational approximation of e", `\\(f(a, b, c) = \\frac{a}{|e-\\frac{b}{c}|}\\)`, (a: IMathVariable, b: IMathVariable, c: IMathVariable) => a.v / Math.abs(Math.E - b.v / c.v),
  [new MathVariable("a", 20, 2), new MathVariable("b", 20), new MathVariable("c", 20)], [EMathTrait.approximation]),
  () => new MathEquation("Rational approximation of pi", `\\(f(a, b, c) = \\frac{a}{|\\pi-\\frac{b}{c}|}\\)`, (a: IMathVariable, b: IMathVariable, c: IMathVariable) => a.v / Math.abs(Math.PI - b.v / c.v),
  [new MathVariable("a", 20, 2), new MathVariable("b", 20), new MathVariable("c", 20)], [EMathTrait.approximation]),
  () => new MathEquation("Integral 1", "\\(f(a, b) = \\int_a^b 2 \\cdot \\sqrt a \\cdot x dx\\)", (a: IMathVariable, b: IMathVariable) => Math.max(Math.sqrt(a.v) * Math.pow(b.v, 2) - Math.pow(a.v, 2.5), 0), [new MathVariable("a"), new MathVariable("b")], [EMathTrait.integral]),
]

// I am at no point claiming that any of these equations are derived correctly or that any formulas converted match those displayed.

/*
Math Jax Wrapper usage:
- the entire formula is inside `\\( FormulaHere \\)`
- all keywords start with \\

=> For easy creation use http://asciimath.org/ and apply the rules above, when implementing
*/

/*
possible equations:

articles from insight

more approximations (phi)


*/