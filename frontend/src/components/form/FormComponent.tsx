import React, { useEffect, useMemo } from "react";
import { Formik, Form } from "formik";
import { Accordion, Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
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
import { Scenario, useScenarioContext } from "../../context/scenarioConstants";
import { initialValues } from "./initialValues";

interface FormComponentProps {
  onSubmit: (data: FormValuesType) => void;
  onReset: () => void;
  loading: boolean;
  activeScenarioId: string | null;
}

const Header = ({ title }: { title: string }) => (
  <h4 className="mb-3 mt-4 text-start fw-bold display-7">{title}</h4>
);

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit, onReset, loading, activeScenarioId }) => {
  const { scenarios, updateScenario, deleteScenario, duplicateScenario, newBlankScenario, switchScenario } = useScenarioContext();
  const activeScenario = scenarios.find((scenario: Scenario) => scenario.id === activeScenarioId);

  // This useMemo and useEffect are used to call onSubmit when the component is first rendered.
  const values = useMemo(() => {
    return activeScenario?.values;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (values) {
      onSubmit(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      initialValues={activeScenario ? activeScenario.values : initialValues}
      enableReinitialize
      onSubmit={async (values) => {
        try {
          onSubmit(values);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {({ handleSubmit, values }) => {
        const conditionallyUpdateScenario = (values: FormValuesType) => {
          if (activeScenarioId) {
            updateScenario(activeScenarioId, values);
          }
        }

        const handleDuplicateScenario = () => {
          conditionallyUpdateScenario(values);
          duplicateScenario(values);
          handleSubmit();
        }

        const handleNewBlankScenario = () => {
          conditionallyUpdateScenario(values);
          newBlankScenario();
          handleSubmit();
        }

        const handleSwitchScenario = (id: string) => {
          conditionallyUpdateScenario(values);
          switchScenario(id);
          handleSubmit();
        }

        const handleDeleteScenario = () => {
          deleteScenario(activeScenarioId!);
          handleSubmit();
        }

        const handleScenarioNameChange = (newValue: string) => {
          conditionallyUpdateScenario({ ...values, name: newValue });
        }

        return (
          <Form onSubmit={(e) => {
            e.preventDefault();
            conditionallyUpdateScenario(values);
            handleSubmit();
          }}>
            <Row>
              <Col xs={12} md={4}>
                <DropdownButton variant={activeScenarioId ? "outline-success" : "success"} className="mt-3" title={activeScenario ? `Scenario: ${activeScenario.values.name}` : "Create a new scenario"}>
                  <Dropdown.Header><b>Select scenario</b></Dropdown.Header>
                  {scenarios.map((scenario: ScenarioFieldsType) => (
                    <Dropdown.Item
                      key={scenario.id}
                      onClick={() => handleSwitchScenario(scenario.id)}
                      active={activeScenarioId === scenario.id}
                    >
                      {scenario.values.name}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Header><b>Create a new...</b></Dropdown.Header>
                  <Dropdown.Item onClick={handleNewBlankScenario}>Blank scenario</Dropdown.Item>
                  <Dropdown.Item onClick={handleDuplicateScenario} disabled={!activeScenarioId}>Copy of the current scenario</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col xs={12} md={4}>
                <Button variant="primary" type="submit" className="mt-3" disabled={loading || !activeScenarioId} style={{ width: "190px" }}>
                  {loading ? "Loading..." : "See your results"}
                </Button>
              </Col>
              <Col xs={12} md={4}>
                <Button variant="outline-danger" onClick={handleDeleteScenario} className="mt-3">
                  Delete scenario
                </Button>
                <Button variant="danger" onClick={onReset} className="mt-3 mx-3">Reset</Button>
              </Col>
            </Row>
            {activeScenarioId && (
              <>
                <Row className="mt-5">
                  <TextInput name="name" label="Scenario name" maxWidth="400px" onChange={handleScenarioNameChange} />
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
                  <Section title="Other income" summary={`(${values.other_incomes.length})`}>
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
                  <Section title="Federal, state, and local income taxes" infoText="Configure the income tax brackets and standard deductions. The default values are for someone living in New York, NY.">
                    <IncomeTaxFields values={values.config} />
                  </Section>
                </Accordion>
              </>
            )}
            {!activeScenarioId && (
              <Row className="mt-5">
                <h4 className="text-center">No active scenario</h4>
              </Row >
            )}
          </Form>
        )
      }}
    </Formik >
  );
};

export default FormComponent;
