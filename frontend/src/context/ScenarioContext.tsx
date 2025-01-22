import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { initialValues } from "../components/form/initialValues";
import { FormValuesType } from "../components/form/types";
import { Scenario, ScenarioContext } from "./scenarioConstants";
import { useState, ReactNode } from "react";

export const ScenarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([{
    id: uuidv4(),
    values: initialValues
  }]);

  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(scenarios[0]?.id);
  const [blankScenarioCount, setBlankScenarioCount] = useState(1);
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

  const duplicateScenario = (values: FormValuesType) => {
    const newID = uuidv4();
    const newValues = cloneDeep(values);
    newValues.name = "Copy of " + newValues.name;
    addScenario({
      id: newID,
      values: newValues
    });
    setActiveScenarioId(newID);
  }

  const newBlankScenario = () => {
    const newID = uuidv4();
    const newValues = cloneDeep(initialValues);
    newValues.name = `Blank scenario ${blankScenarioCount}`;
    addScenario({
      id: newID,
      values: newValues
    });
    setBlankScenarioCount(blankScenarioCount + 1);
    setActiveScenarioId(newID);
  }

  const switchScenario = (id: string) => {
    setActiveScenarioId(id);
  }

  const deleteScenario = (id: string) => {
    const newScenarios = scenarios.filter((scenario) => scenario.id !== id);
    setScenarios(newScenarios);
    if (activeScenarioId === id) {
      setActiveScenarioId(newScenarios[0]?.id);
    }
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenarios,
        activeScenarioId,
        updateScenario,
        deleteScenario,
        duplicateScenario,
        newBlankScenario,
        switchScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
