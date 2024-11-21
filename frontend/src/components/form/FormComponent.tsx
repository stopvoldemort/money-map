import React from "react";
import { Formik, Form } from "formik";
import { Accordion, Button } from "react-bootstrap";
import ExpenseFields from "./ExpenseFields";
import IncomeFields from "./IncomeFields";
import Section from "./Section";
import DynamicFields from "./DynamicFields";
import FieldsContainer from "./FieldsContainer";
import AccountFields from "./AccountFields";
import { FieldArray } from "formik";
import { initialValues } from "./initialValues";

interface FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (data: any) => void;
}

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
          <Accordion alwaysOpen>
            <Section title="Savings">
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
            <Section title="Income">
              <DynamicFields
                name="incomes"
                values={formik.values.incomes}
                initialValues={IncomeFields.initialValues}
                fieldsComponent={IncomeFields}
              />
            </Section>
            <Section title="Assets">{[]}</Section>
            <Section title="Spending">
              <DynamicFields
                name="expenses"
                values={formik.values.expenses}
                initialValues={ExpenseFields.initialValues}
                fieldsComponent={ExpenseFields}
              />
            </Section>
            <Section title="Debts">{[]}</Section>
            <Section title="Transfers">{[]}</Section>
            <Section title="Miscellaneous">{[]}</Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
