import React from "react";
import { Formik, Form } from "formik";
import { Accordion, Button } from "react-bootstrap";
import ExpenseFields from "./ExpenseFields";
import IncomeFields from "./IncomeFields";
import AssetFields from "./AssetFields";
import Section from "./Section";
import DynamicFields from "./DynamicFields";
import FieldsContainer from "./FieldsContainer";
import AccountFields from "./AccountFields";
import { FieldArray } from "formik";
import { initialValues } from "./initialValues";
import { FormValuesType } from "./types";
import ScheduledDebtFields from "./ScheduledDebtFields";

interface FormComponentProps {
  onUpdate: (data: FormValuesType) => void;
}

const Header = ({ title }: { title: string }) => (
  <h2 className="mb-3 mt-4 text-start fw-bold display-7">{title}</h2>
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
          <Header title="The Present" />
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
            <Section title="Assets" infoText="Any assets you have, like real estate, etc.">
              <DynamicFields
                name={AssetFields.fieldsKey}
                values={formik.values.assets}
                initialValues={AssetFields.initialValues}
                fieldsComponent={AssetFields}
              />
            </Section>
            <Section title="Scheduled debts" infoText="Scheduled debt payments are debts that are paid off over time, such as student loans or mortgages.">
              <DynamicFields
                name={ScheduledDebtFields.fieldsKey}
                values={formik.values.scheduled_debts}
                initialValues={ScheduledDebtFields.initialValues}
                fieldsComponent={ScheduledDebtFields}
              />
            </Section>
            <Section title="Other debts" infoText="Any other debts you have, like credit card debt or personal loans.">{[]}</Section>
          </Accordion>

          <Header title="The Future" />
          <Accordion alwaysOpen>
            <Section title="Expected income" infoText="Income expected in the future, like salary, freelance work, social security, etc.">
              <DynamicFields
                name={IncomeFields.fieldsKey}
                values={formik.values.incomes}
                initialValues={IncomeFields.initialValues}
                fieldsComponent={IncomeFields}
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
            <Section title="Expected transfers between accounts" infoText="Transfers between your accounts, like from a bank account to a retirement account.">{[]}</Section>
          </Accordion>

          <Header title="Miscellaneous" />
          <Accordion alwaysOpen>
            <Section title="Meta-parameters (TODO)" infoText="Stock and bond returns, start and end years, etc.">{[]}</Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      )
      }
    </Formik >
  );
};

export default FormComponent;
