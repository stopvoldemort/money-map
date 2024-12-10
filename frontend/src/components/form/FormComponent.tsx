import React from "react";
import { Formik, Form } from "formik";
import { Accordion, Button } from "react-bootstrap";
import ExpenseFields from "./ExpenseFields";
import OtherIncomeFields from "./OtherIncomeFields";
import AssetFields from "./AssetFields";
import Section from "./Section";
import DynamicFields from "./DynamicFields";
import FieldsContainer from "./FieldsContainer";
import AccountFields from "./AccountFields";
import { FieldArray } from "formik";
import { FormValuesType } from "./types";
import ScheduledDebtFields from "./ScheduledDebtFields";
import OtherDebtFields from "./OtherDebtFields";
import SalaryFields from "./SalaryFields";
import TransferFields from "./TransferFields";
import HousePurchaseFields from "./HousePurchaseFields";
import ConfigFields from "./ConfigFields";

interface FormComponentProps {
  onUpdate: (data: FormValuesType) => void;
  initialValues: FormValuesType;
  onClear: () => void;
}

const Header = ({ title }: { title: string }) => (
  <h4 className="mb-3 mt-4 text-start fw-bold display-7">{title}</h4>
);

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate, initialValues, onClear }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        console.log("TRYING TO SUBMIT")
        try {
          onUpdate(values);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {({ handleSubmit, values }) => (
        <Form onSubmit={(e) => {
          e.preventDefault();
          console.log("SUBMITTING")
          handleSubmit();
        }}>
          <div className="d-flex justify-content-center position-relative mt-3">
            <Button variant="primary" type="submit" className="mt-3">
              See your money map
            </Button>
            <Button variant="outline-danger" onClick={onClear} className="mt-3 position-absolute end-0">
              Reset
            </Button>
          </div>
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
            <Section title="Other income" summary={`(${values.other_incomes.length})`} infoText="Other income expected in the future, like social security.">
              <DynamicFields
                name={OtherIncomeFields.fieldsKey}
                values={values.other_incomes}
                initialValues={OtherIncomeFields.initialValues}
                fieldsComponent={OtherIncomeFields}
              />
            </Section>
            <Section title="Expected expenses" summary={`(${values.expenses.length})`} infoText="Includes any and all expenses expected in the future, like rent, food, car repairs, etc.">
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
            <Section title="Investment returns, start and end years, etc.">
              <ConfigFields />
            </Section>
          </Accordion>
        </Form>
      )
      }
    </Formik >
  );
};

export default FormComponent;
