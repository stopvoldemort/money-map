import { personalData } from "../../private/personal_data";
import { initialValues } from "../components/form/initialValues";
import { FormValuesType } from "../components/form/types";
import { Scenario, ScenarioContext } from "./scenarioConstants";
import { useState, ReactNode } from "react";

export const ScenarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([{
    id: "123",
    values: personalData
  }, {
    id: "456",
    values: initialValues
  }]);

  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(scenarios[0]?.id);

  const addScenario = (scenario: Scenario) => {
    setScenarios((prev) => [...prev, scenario]);
  };

  const updateScenario = (id: string, updatedScenario: FormValuesType) => {
    setScenarios((prev) =>
      prev.map((scenario) =>
        scenario.id === id ? { ...scenario, values: updatedScenario } : scenario
      )
    );
  };

  const deleteScenario = (id: string) => {
    setScenarios((prev) => prev.filter((scenario) => scenario.id !== id));
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenarios,
        activeScenarioId,
        setActiveScenarioId,
        addScenario,
        updateScenario,
        deleteScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
