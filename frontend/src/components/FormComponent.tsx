import React from 'react';
import { Formik, Form } from 'formik';
import { Accordion, Button } from 'react-bootstrap';
import ExpenseFields from './ExpenseFields';
import IncomeFields from './IncomeFields';
import Section from './Section';
import Fields from './Fields';

interface FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (data: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
  const initialValues = {
    expenses: [],
    incomes: []
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          onUpdate(values);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Accordion alwaysOpen>
            <Section title="Spending">
              <Fields
                name="expenses"
                values={formik.values.expenses}
                initialValues={ExpenseFields.initialValues}
                fieldsComponent={ExpenseFields}
              />
            </Section>
            <Section title="Income">
              <Fields
                name="incomes"
                values={formik.values.incomes}
                initialValues={IncomeFields.initialValues}
                fieldsComponent={IncomeFields}
              />
            </Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;