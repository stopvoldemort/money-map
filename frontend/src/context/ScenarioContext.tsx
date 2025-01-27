import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { initialValues } from "../components/form/initialValues";
import { FormValuesType } from "../components/form/types";
import { Scenario, ScenarioContext } from "./scenarioConstants";
import { useState, ReactNode } from "react";
import { buildScenario } from "../components/getting_started/scenarioBuilder";
import { GettingStartedFormValues } from "../components/getting_started/types";

export const ScenarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([{
    id: uuidv4(),
    values: initialValues
  }]);

  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(scenarios[0]?.id);
  const [blankScenarioCount, setBlankScenarioCount] = useState(1);
  const addScenario = (scenario: Scenario) => {
    setScenarios((prev) => [...prev, scenario]);
    setActiveScenarioId(scenario.id);
  };

  const updateScenario = (id: string, updatedScenario: FormValuesType) => {
    setScenarios((prev) =>
      prev.map((scenario) =>
        scenario.id === id ? { ...scenario, values: updatedScenario } : scenario
      )
    );
  };

  // It's hacky to return the new scenarios array, but I need to use them before
  // the context updates.
  const addScenarioFromGettingStartedForm = (values: GettingStartedFormValues): Scenario[] => {
    const scenario = buildScenario(values);
    const newScenarios = [scenario];
    setScenarios(newScenarios);
    setActiveScenarioId(scenario.id);
    return newScenarios;
  }

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
        addScenarioFromGettingStartedForm,
        switchScenario,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
