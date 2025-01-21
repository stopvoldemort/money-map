import { createContext, useContext } from "react";
import { FormValuesType } from "../components/form/types";

// Create the context
export const ScenarioContext = createContext<ScenarioContextValue | undefined>(undefined);

// Define the structure of a scenario
export interface Scenario {
  id: string;
  values: FormValuesType;
}


// Define the structure of the context value
interface ScenarioContextValue {
  scenarios: Scenario[];
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, updatedScenario: FormValuesType) => void;
  deleteScenario: (id: string) => void;
  activeScenarioId: string | null;
  setActiveScenarioId: (id: string | null) => void;
}


export const useScenarioContext = () => {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenarioContext must be used within a ScenarioProvider");
  }
  return context;
};
