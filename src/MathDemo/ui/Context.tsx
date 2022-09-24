import React from "react"
import { IMathDemo } from "../interfaces/IMathDemo"

export const Context: {
  MathDemo: React.Context<IMathDemo>;
} = {
  MathDemo: React.createContext<IMathDemo>({} as IMathDemo)
}

export const useMathDemo = (): IMathDemo => React.useContext(Context.MathDemo);