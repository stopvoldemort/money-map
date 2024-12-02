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
import { initialValues } from "./initialValues";
import { FormValuesType } from "./types";
import ScheduledDebtFields from "./ScheduledDebtFields";
import OtherDebtFields from "./OtherDebtFields";
import SalaryFields from "./SalaryFields";
import TransferFields from "./TransferFields";
import AssetPurchaseFields from "./AssetPurchaseFields";

interface FormComponentProps {
  onUpdate: (data: FormValuesType) => void;
}

const Header = ({ title }: { title: string }) => (
  <h4 className="mb-3 mt-4 text-start fw-bold display-7">{title}</h4>
);

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          onUpdate(values);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Button variant="primary" type="submit" className="mt-3">
            See your money map
          </Button>
          <Header title="Current Assets and Liabilities" />
          <Accordion alwaysOpen>
            <Section title="Savings and investments">
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
            <Section title="Other assets" infoText="Any other assets you have, like real estate.">
              <DynamicFields
                name={AssetFields.fieldsKey}
                values={formik.values.assets}
                initialValues={AssetFields.initialValues}
                fieldsComponent={AssetFields}
              />
            </Section>
            <Section title="Long-term loans" infoText="Long-term loans are loans that are paid back through regular scheduled payments, like student loans or mortgages.">
              <DynamicFields
                name={ScheduledDebtFields.fieldsKey}
                values={formik.values.scheduled_debts}
                initialValues={ScheduledDebtFields.initialValues}
                fieldsComponent={ScheduledDebtFields}
              />
            </Section>
            <Section title="Other debts" infoText="Any other debts you have, like credit card debt or personal loans.">
              <DynamicFields
                name={OtherDebtFields.fieldsKey}
                values={formik.values.other_debts}
                initialValues={OtherDebtFields.initialValues}
                fieldsComponent={OtherDebtFields}
              />
            </Section>
          </Accordion>

          <Header title="Future Income and Expenses" />
          <Accordion alwaysOpen>
            <Section title="Expected salary">
              <DynamicFields
                name={SalaryFields.fieldsKey}
                values={formik.values.salaries}
                initialValues={SalaryFields.initialValues}
                fieldsComponent={SalaryFields}
              />
            </Section>
            <Section title="Other income" infoText="Other income expected in the future, like social security.">
              <DynamicFields
                name={OtherIncomeFields.fieldsKey}
                values={formik.values.other_incomes}
                initialValues={OtherIncomeFields.initialValues}
                fieldsComponent={OtherIncomeFields}
              />
            </Section>
            <Section title="Expected expenses" infoText="Includes any and all expenses expected in the future, like rent, food, car repairs, etc.">
              <DynamicFields
                name={ExpenseFields.fieldsKey}
                values={formik.values.expenses}
                initialValues={ExpenseFields.initialValues}
                fieldsComponent={ExpenseFields}
              />
            </Section>
            <Section title="Expected home & property purchases">
              <DynamicFields
                name={AssetPurchaseFields.fieldsKey}
                values={formik.values.house_purchases}
                initialValues={AssetPurchaseFields.initialValues}
                fieldsComponent={AssetPurchaseFields}
              />
            </Section>
            <Section title="Transfers between accounts" infoText="Transfers between your accounts, like from a bank account to a 529 account. These will only occur if there's enough money in the source account to cover the transfer.">
              <DynamicFields
                name={TransferFields.fieldsKey}
                values={formik.values.transfers}
                initialValues={TransferFields.initialValues}
                fieldsComponent={TransferFields}
              />
            </Section>
          </Accordion>

          <Header title="Configuration" />
          <Accordion alwaysOpen>
            <Section title="Stock and bond returns, start and end years, etc. (TODO)">{[]}</Section>
          </Accordion>
        </Form>
      )
      }
    </Formik >
  );
};

export default FormComponent;
