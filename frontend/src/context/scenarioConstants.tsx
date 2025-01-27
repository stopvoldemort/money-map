import { createContext, useContext } from "react";
import { FormValuesType } from "../components/form/types";
import { GettingStartedFormValues } from "../components/getting_started/types";

export const ScenarioContext = createContext<ScenarioContextValue | undefined>(undefined);

export interface Scenario {
  id: string;
  values: FormValuesType;
}

interface ScenarioContextValue {
  scenarios: Scenario[];
  deleteScenario: (id: string) => void;
  addScenarioFromGettingStartedForm: (values: GettingStartedFormValues) => Scenario[];
  duplicateScenario: (values: FormValuesType) => void;
  newBlankScenario: () => void;
  switchScenario: (id: string) => void;
  activeScenarioId: string | null;
  updateScenario: (id: string, values: FormValuesType) => void;
}

export const useScenarioContext = () => {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenarioContext must be used within a ScenarioProvider");
  }
  return context;
};
