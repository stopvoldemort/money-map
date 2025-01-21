import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Accordion, Button, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import ExpenseFields from "./ExpenseFields";
import OtherIncomeFields from "./OtherIncomeFields";
import AssetFields from "./AssetFields";
import Section from "./Section";
import DynamicFields from "./DynamicFields";
import FieldsContainer from "./FieldsContainer";
import AccountFields from "./AccountFields";
import { FieldArray } from "formik";
import { FormValuesType, ScenarioFieldsType } from "./types";
import ScheduledDebtFields from "./ScheduledDebtFields";
import OtherDebtFields from "./OtherDebtFields";
import SalaryFields from "./SalaryFields";
import TransferFields from "./TransferFields";
import HousePurchaseFields from "./HousePurchaseFields";
import SocialSecurityFields from "./SocialSecurityFields";
import InvestmentReturnFields from "./InvestmentReturnFields";
import GeneralConfigFields from "./GeneralConfigFields";
import IncomeTaxFields from "./IncomeTaxFields";
import TextInput from "../inputs/TextInput";
import { initialValues as defaultValues } from "./initialValues";
import { Scenario, useScenarioContext } from "../../context/scenarioConstants";

interface FormComponentProps {
  onUpdate: (data: FormValuesType) => void;
  onClear: () => void;
  loading: boolean;
  activeScenarioId: string | null;
}

const Header = ({ title }: { title: string }) => (
  <h4 className="mb-3 mt-4 text-start fw-bold display-7">{title}</h4>
);

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate, onClear, loading, activeScenarioId }) => {
  const { scenarios, addScenario, updateScenario, setActiveScenarioId } = useScenarioContext();
  const [blankScenarioCount, setBlankScenarioCount] = useState(1);
  const activeScenario = scenarios.find((scenario: Scenario) => scenario.id === activeScenarioId);

  if (!activeScenario) {
    return <div>No active scenario</div>;
  }

  console.log("active scenario ID", activeScenario.id)

  return (
    <Formik
      initialValues={activeScenario.values}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          onUpdate(values);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {({ handleSubmit, values }) => {
        const conditionallyUpdateScenario = () => {
          if (activeScenarioId) {
            updateScenario(activeScenarioId, values);
          }
        }
        const duplicateScenario = () => {
          conditionallyUpdateScenario();
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
          conditionallyUpdateScenario();
          const newID = uuidv4();
          const newValues = cloneDeep(defaultValues);
          newValues.name = `Blank scenario ${blankScenarioCount}`;
          addScenario({
            id: newID,
            values: newValues
          });
          setBlankScenarioCount(blankScenarioCount + 1);
          setActiveScenarioId(newID);
        }

        const switchScenario = (id: string) => {
          conditionallyUpdateScenario();
          setActiveScenarioId(id);
        }

        return (
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <div className="d-flex justify-content-center position-relative mt-3">
              <DropdownButton variant="outline-primary" className="mt-3 position-absolute start-0" title="Switch scenario">
                {scenarios.map((scenario: ScenarioFieldsType) => (
                  <Dropdown.Item
                    key={scenario.id}
                    onClick={() => switchScenario(scenario.id)}
                    active={activeScenarioId === scenario.id}
                  >
                    {scenario.values.name}
                  </Dropdown.Item>
                ))}
                <hr />
                <Dropdown.Item onClick={newBlankScenario}>New blank scenario</Dropdown.Item>
                <Dropdown.Item onClick={duplicateScenario}>Duplicate current scenario</Dropdown.Item>
              </DropdownButton>
              <Button variant="primary" type="submit" className="mt-3" disabled={loading} style={{ width: "190px" }}>
                {loading ? "Loading..." : "See your results"}
              </Button>
              <Button variant="outline-danger" onClick={onClear} className="mt-3 position-absolute end-0">
                Delete scenario
              </Button>
            </div>
            <Row className="mt-5">
              <TextInput name="name" label="Scenario name" maxWidth="400px" />
            </Row>
            <Header title="Current Assets and Liabilities" />
            <Accordion alwaysOpen>
              <Section title="Savings and investments" summary={`(${values.accounts.length})`}>
                <FieldArray name="accounts">
                  {() => (
                    <FieldsContainer>
                      <AccountFields index={0} />
                      <AccountFields index={1} />
                      <AccountFields index={2} />
                      <AccountFields index={3} />
                      <AccountFields index={4} />
                    </FieldsContainer>
                  )}
                </FieldArray>
              </Section>
              <Section title="Other assets" summary={`(${values.assets.length})`} infoText="Any other assets you have, like real estate.">
                <DynamicFields
                  name={AssetFields.fieldsKey}
                  values={values.assets}
                  initialValues={AssetFields.initialValues}
                  fieldsComponent={AssetFields}
                />
              </Section>
              <Section title="Long-term loans" summary={`(${values.scheduled_debts.length})`} infoText="Long-term loans are loans that are paid back through regular scheduled payments, like student loans or mortgages.">
                <DynamicFields
                  name={ScheduledDebtFields.fieldsKey}
                  values={values.scheduled_debts}
                  initialValues={ScheduledDebtFields.initialValues}
                  fieldsComponent={ScheduledDebtFields}
                />
              </Section>
              <Section title="Other debts" summary={`(${values.other_debts.length})`} infoText="Any other debts you have, like credit card debt or personal loans.">
                <DynamicFields
                  name={OtherDebtFields.fieldsKey}
                  values={values.other_debts}
                  initialValues={OtherDebtFields.initialValues}
                  fieldsComponent={OtherDebtFields}
                />
              </Section>
            </Accordion>

            <Header title="Future Income and Expenses" />
            <Accordion alwaysOpen>
              <Section title="Expected salary" summary={`(${values.salaries.length})`}>
                <DynamicFields
                  name={SalaryFields.fieldsKey}
                  values={values.salaries}
                  initialValues={SalaryFields.initialValues}
                  fieldsComponent={SalaryFields}
                />
              </Section>
              <Section title="Expected social security" summary={`(${values.social_security.length})`}>
                <DynamicFields
                  name={SocialSecurityFields.fieldsKey}
                  values={values.social_security}
                  initialValues={SocialSecurityFields.initialValues}
                  fieldsComponent={SocialSecurityFields}
                />
              </Section>
              <Section title="Other income" summary={`(${values.other_incomes.length})`} infoText="Other income expected in the future, like social security.">
                <DynamicFields
                  name={OtherIncomeFields.fieldsKey}
                  values={values.other_incomes}
                  initialValues={OtherIncomeFields.initialValues}
                  fieldsComponent={OtherIncomeFields}
                />
              </Section>
              <Section title="Expected expenses" summary={`(${values.expenses.length})`} infoText="Includes any and all expenses expected in the future, like rent, food, car repairs, etc. Don't include taxes, as they'll be calculated for you.">
                <DynamicFields
                  name={ExpenseFields.fieldsKey}
                  values={values.expenses}
                  initialValues={ExpenseFields.initialValues}
                  fieldsComponent={ExpenseFields}
                />
              </Section>
              <Section title="Expected home & property purchases" summary={`(${values.house_purchases.length})`}>
                <DynamicFields
                  name={HousePurchaseFields.fieldsKey}
                  values={values.house_purchases}
                  initialValues={HousePurchaseFields.initialValues}
                  fieldsComponent={HousePurchaseFields}
                />
              </Section>
              <Section title="Transfers between accounts" summary={`(${values.transfers.length})`} infoText="Transfers between your accounts, like from a bank account to a 529 account. These will only occur if there's enough money in the source account to cover the transfer.">
                <DynamicFields
                  name={TransferFields.fieldsKey}
                  values={values.transfers}
                  initialValues={TransferFields.initialValues}
                  fieldsComponent={TransferFields}
                />
              </Section>
            </Accordion>

            <Header title="Configuration" />
            <Accordion alwaysOpen>
              <Section title="General">
                <GeneralConfigFields />
              </Section>
              <Section title="Investment returns">
                <InvestmentReturnFields />
              </Section>
              <Section title="Income tax rates" infoText="Configure the federal, state, and local income tax brackets and standard deductions. The default values are for a married household filing jointly in New York City.">
                <IncomeTaxFields values={values.config} />
              </Section>
            </Accordion>
          </Form>
        )
      }}
    </Formik >
  );
};

export default FormComponent;
